var express = require('express');
var router = express.Router();
var VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3'); //Watson APIs Node.js SDK https://github.com/watson-developer-cloud/node-sdk
var sharp = require('sharp');
const GENERAL_IMAGE_MAX_SIZE = 10485760; //10M

var CLASSIFIER_ID = process.env.CLASSIFIER_ID;
if (!CLASSIFIER_ID){
    CLASSIFIER_ID = 'food';
}

//for Openshift Workshop
if (!process.env.WATSON_VISION_COMBINED_APIKEY && process.env.VISUAL_RECOGNITION_APIKEY) {
    process.env.WATSON_VISION_COMBINED_APIKEY = process.env.VISUAL_RECOGNITION_APIKEY
    process.env.WATSON_VISION_COMBINED_IAM_APIKEY = process.env.VISUAL_RECOGNITION_IAM_APIKEY
    process.env.WATSON_VISION_COMBINED_URL = process.env.VISUAL_RECOGNITION_URL
    process.env.WATSON_VISION_COMBINED_AUTH_TYPE = process.env.VISUAL_RECOGNITION_AUTH_TYPE
}

var visualRecognition = new VisualRecognitionV3({ 
  version: '2018-05-01'
});

const fs = require("fs");
const formidable = require("formidable");

async function callVisualRecognition(filePath, baseUrl) {
    let parms = {}; 
    switch(baseUrl){ 
        case '/classifyImages':
            params = {
                imagesFile: fs.createReadStream(filePath),
                acceptLanguage: 'ja'
            };
            break;

        case '/classifyCustomImages':
            params = {
                imagesFile: fs.createReadStream(filePath),
                classifierIds: [CLASSIFIER_ID],
                acceptLanguage: 'ja'
            };
            break;
    };
    try {
        const response = await visualRecognition.classify(params); //SDKでVisualRecognition呼び出し
        return response;
    } catch (error) {
        throw Error(error);
    } 
  
}

router.post('/', async function(req, res) {
    console.log(req.baseUrl);
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async function (err, fields, files) {
        if (err) {
            console.log('Error: No Parameters' + err);
            res.json({  
                errMsg: 'Error: No Parameters' + err
            });
            return;
        } else {            
            if ( !Object.keys(files).length){
                console.log('Error: No file');
                res.json({  
                    errMsg: 'Error: No file'
                });
                return;
            }
            const fileinfo = JSON.parse(JSON.stringify(files));
            console.log(fileinfo);
            
            let filePath = fileinfo.file.path;
            const sharp_image = sharp(filePath);

            if (!fileinfo.file.type.startsWith('image/')) {
                console.log("Error: Not an image file.");
                res.json({  
                    errMsg: 'Error: Not an image file.'
                });
                return;
            }
            
            const metadata = await sharp_image.metadata();
            let rotate_degree = 0;
            switch(metadata.orientation){ 
                case 3:
                    rotate_degree = 180;
                    break;
                case 6:
                    rotate_degree = 90;
                    break;
                case 8:
                    rotate_degree = 270;
                    break;
            }

            let image_max_size = GENERAL_IMAGE_MAX_SIZE; 

            try {
                if(fileinfo.file.size > image_max_size){                                     
                    const resize_filename = filePath + '_resize.jpg';
                    console.log(resize_filename)
                    let size = fileinfo.file.size;
                    let width = metadata.width;
                    let info = null; 
                    while (size > image_max_size){
                        console.log('-------RESIZE-------');  
                        width = Math.round(width * 0.5);
                        if (rotate_degree > 0){ 
                            info = await sharp(filePath).rotate(rotate_degree).jpeg().resize(width).toFile(resize_filename);
                        } else {
                            info = await sharp(filePath).jpeg().resize(width).toFile(resize_filename);
                        }
                        size = info.size;
                        console.log(info)
                        info=null;
                    }
                    console.log('-------RESIZE COMP-------');  
                    filePath =  resize_filename;

                }
            } catch (e) {
                console.log('Error: Image resize error'+ e);
                res.json({  
                    errMsg: 'Error: Image resize error' + e
                });
                return;
            }
        
            let response = ''  ;    
            console.log('-------CLASSIFY-------');      
            try {
                response =  await callVisualRecognition(filePath, req.baseUrl);
            } catch (e) {
               // tools.setError(res,'Error: callVisualRecognition' + e );
                console.log('Error: callVisualRecognition:'+ e);
                res.json({  
                    errMsg: 'Error: callVisualRecognition' + e
                });
                return;
            } 

            res.json(response);
            return;
            
        };
    });
});

module.exports = router;
