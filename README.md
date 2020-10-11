# Watson-VisualRecognition-Node.js
Visual Recognition Web application using IBM Watson Visual Recognition This apps is identify whether your mas properly have on your face.

# Architecture Flow

![Program](https://github.com/osonoi/watson-vr-node-e/blob/master/images/program.png)

# Deploy on OpenShift (using Skills Network Labs)
## 1.Create Watson VR service and get credential info
- If you already have Watson VR service, you don't have to create it. you can just use exsisting service
- Reffer https://cloud.ibm.com/docs/visual-recognition?topic=visual-recognition-getting-started-tutorial
and get "apikey" (Save this to your note)

## 2.setup Openshift(Skills Network Labs)
- Go to https://developer.ibm.com/tutorials/openshift-ai-integration-max-model-deployment-labs/
- Login that website if you don't.
- Scroll down and click "Access the Deploy AI microservices on Kubernetss lab here" and wait 1,2 minutes
![OpenShift](https://github.com/osonoi/watson-vr-node-e/blob/master/images/oc4.png)
- Click "Terminal" then "New Terminal"
![OpenShift](https://github.com/osonoi/watson-vr-node-e/blob/master/images/oc5.png)
- You are ready to move to next step 3
![OpenShift](https://github.com/osonoi/watson-vr-node-e/blob/master/images/oc6.png)

## 3.Create project and deploy application.
- Input these command to create project and deploy application.
```
oc new-app https://github.com/osonoi/watson-vr-node-e.git -e CLASSIFIER_ID=food -e WATSON_VISION_COMBINED_APIKEY=<APIKEY>
```
- Please raplace APIKEY to your apikey you get in the first step of this document.
- like ....WATSON_VISION_COMBINED_APIKEY=923eu9213ukewjdkewj.......
```
oc logs -f bc/watson-vr-node-e
oc expose dc watson-vr-node-e --port=3000 --type=LoadBalancer --name=watson-vr-node-ingress
oc expose service watson-vr-node-ingress
oc get route/watson-vr-node-ingress
```
```
Output Example
   NAME                     HOST/PORT                          PATH   SERVICES                 PORT   TERMINATION   WILDCARD
watson-vr-node-ingress   watson-vr-node-ingress-watson-vr.dte-ocp4-yt0ysu-915b3b336cabec458a7c7ec2aa7c625f-0000.us-south.containers.appdomain.cloud          watson-vr-node-ingress   3000                 None
```

- You can see the applcation URL as HOST like
- http://watson-vr-node-ingress-default.dte-ocp4-yt0ysu-915b3b336cabec458a7c7ec2aa7c625f-0000.us-south.containers.appdomain.cloud/  This URL is just exampl, not working now)
- Please open new tab and access to that URL

![AI](https://github.com/osonoi/watson-vr-node-e/blob/master/images/ai1.png)

Clean up
```
oc delete all,configmap,pvc,serviceaccount,rolebinding --selector app=watson-vr-node-e
```
## ------------
## If Skills Network is not available , please use IBM Demos.
## ------------

# Deploy on OpenShift (using IBM Demos site)
## 1.Create Watson VR service and get credential info
- If you already have Watson VR service, you don't have to create it. you can just use exsisting service
- Reffer https://cloud.ibm.com/docs/visual-recognition?topic=visual-recognition-getting-started-tutorial
and get "apikey" (Save this to your note)

## 2-a.setup Openshift(Another OpenShift Site)
- Go to https://www.ibm.com/demos/
- Select "Red Hat OpenShift on IBM Cloud" (scroll down)
- then Select "Hands on Labs for Red Hat OpenShift on IBM Cloud"
- then Select Lab1 and "launch Lab", you can see command line interface on the right.
![OpenShift](https://github.com/osonoi/watson-vr-node-e/blob/master/images/oc1.png)
- Go to Exercise 2 and lauch the OpenShift Web console as described in that page.
- You can see the OpenShift console in another tab.
- Copy login command to your clipboard. (right upper corner, click your account name-> click token -> copy command below "Lpg in with this token")
![OpenShift](https://github.com/osonoi/watson-vr-node-e/blob/master/images/oc2.png)
- Paste that to command line console.
![OpenShift](https://github.com/osonoi/watson-vr-node-e/blob/master/images/oc3.png)



# Deploy on Cloud foundry

## 1. Prerequisites
   - [IBM Cloud account](https://cloud.ibm.com) <br>
   - [Install IBM Cloud CLI](https://cloud.ibm.com/docs/cli/reference/ibmcloud?topic=cloud-cli-install-ibmcloud-cli) <br>


## 2. Create Visual Recognition service and get credential info.
If you already have this service , skip this sesshion.

- 2-1. Login to IBM Cloud https://cloud.ibm.com/login
- 2-2. Click "Catalog" on upper menu.
- 2-3. In the search field, enter "Visual Recongnition" and Enter.
- 2-4. Find "Visual Recognition` and click
- 2-5. `Hit Create on right side of the screen
- 2-6. Wait 2,3 minutes to complete.

## 3. Clone app to local environment8Mac, PC)
Clone this repository in a folder your choice:
```
git clone https://github.com/osonoi-so/watson-vr-node.git
```
then change directory to watson-vr-node by
```
cd watson-vr-node
```

## 4. Deploy Apps on IBM Cloud , Cloud foundry service
 Follow this instruction and deploy app
- 4-1 edit `manifest.yml` in watson-vr-node directory
   - line 3 &lt;Set Your Application Name&gt; to any name you like (It shoud be unique among IBM cloud apps)
   - line 8 &lt;Set Your CLASSIFIER_ID&gt; to your custom class number. If you don't have custom model make this food.

example:
```
---
applications:
- name: myid-watson-vr
  buildpacks:
    - nodejs_buildpack
  command: node -max_old_space_size=2048 app.js
  env:
    CLASSIFIER_ID: food
  memory: 256M
```

- 4-2 login to IBM cloud
```
ibmcloud login -r us-south
```
target environment to Cloud foundry
```
ibmcloud target --cf
```
- 4-3 Upload code to IBM Cloud
 Upload code by this command
```
ibmcloud cf push
```
 This command just upload the code but does't start the apps
- 4-5 Bind Visual Recognition service to your apps
- 4-5-1 login to IBM Cloud at https://cloud.ibm.com/login (Browser screen)
- 4-5-2 Click "Cloud Foundry apps" on Dashboard
- 4-5-3 Click your apps name
- 4-5-4 Select "Connections" on the left side menu and "Create connection" on the right side of the screen.
- 4-5-5 Check "Visual Recognition" and click "next", followed by click "Connext"
- 4-5-6 Click "Restage"
- 4-5-7 wait 2,3 minutes and you will see "Visit URL" is becomes available, Click that and go to apps tab.

