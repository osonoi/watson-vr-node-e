# watson-vr-node
Visual Recognition Web application using IBM Watson Visual Recognition This apps is identify whether your mas properly have on your face.

# Architecture Flow

![Program](https://github.com/osonoi-so/watson-vr-node/blob/master/images/program.png)

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
 Follow these instruction and deploy app
- 4-1 edit `manifest.yml` in watson-vr-node directory
   - line 3 <Set Your Application Name> to any name you like (It shoud be unique among IBM cloud apps)
   - line 8 <Set Your CLASSIFIER_ID> to your custom class number. If you don't have custom model make this food.

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





