# watson-vr-node
Visual Recognition Web application using IBM Watson Visual Recognition This apps is identify whether your mas properly have on your face.

# Architecture Flow

## 1. Prerequisites
   - [IBM Cloud account](https://cloud.ibm.com) <br>
   - [Install IBM Cloud CLI](https://cloud.ibm.com/docs/cli/reference/ibmcloud?topic=cloud-cli-install-ibmcloud-cli) <br>


## 2. Create Visual Recognition service and get credential info.
If you already have this service , go to 2-7

- 2-1. Login to IBM Cloud https://cloud.ibm.com/login
- 2-2. Click "Catalog" on upper menu.
- 2-3. In the search field, enter "Visual Recongnition" and Enter.
- 2-4. Find "Visual Recognition` and click
- 2-5. `Hit Create on right side of the screen
- 2-6. Wait 2,3 minutes complete.
- 2-7. On Visual Recongnition menu, select "Service credential" on left side of the menu.
- 2-8. Open one of the key and copy and save apikey and url to somewhere on your PC.

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

IBM CloudのCloud Foundry アプリケーションと　IBM Cloud上のサービスを接続(bind)すると、資格情報や接続情報が連携され、個別に設定する必要がなくなります。

> 画面イメージのある手順を参照したい場合は[IBM Cloud: Cloud Foundry アプリケーションとサービスの接続](https://qiita.com/nishikyon/items/0e21fdabcd7f8966bb24)を参照して下さい

1. https://cloud.ibm.com/login よりIBM Cloudにログイン

2. 表示されたダッシュボードの[リソースの要約]から`全て表示`をクリックする。

3. `Cloud Foundry アプリ`の先頭の`v`をクリックする。

4. `4. アプリケーションのIBM Cloudへのデプロイ`の` 1. manifest.ymlの編集`で設定したアプリケーション名が表示されているので、そのアプリケーション名をクリックする。

5. 左のメニューから`接続`をクリックする。

6. `「接続の作成」`ボタンをクリックする。

7.  表示された `Visual Recognition`のサービスの行にマウスポインターを乗せると、右側に`「接続」`ボタンが表示される。表示された`「接続」`をクリックする。

8. `IAM対応サービスのの接続`というウィンドウが表示されるので、デフォルト値ののまま、`「接続」`ボタンをクリックする。

9. `アプリの再ステージ`というウィンドウが表示されるので、`「再ステージ」`ボタンをクリックする。
> `IAM対応サービスの接続`というウィンドウが表示されたままの場合は、`「キャンセル」`ボタンをクリックし閉じでください。

## 6. アプリケーションの動作確認
1. アプリケーションが稼働中(実行中)になったら、`アプリ URL にアクセス`をクリックする。
アプリケーションの画面が表示されます。
`「ファイルの選択」`から写真を選んだ後、各青ボタンをクリックして、Visual Recognitionの結果を確認します。

- Watsonで認識（Watson学習済みモデルを利用):
  -Watsonが写真を認識した内容を表示します。

- Watsonで認識（カスタムモデルを利用):
  - カスタムモデル認識したクラスを表示します。

2.　スマートフォンでの確認
一番下にQRコードが表示されているので、それをスマートフォンのカメラで読んでUアプリケーションのRLにアクセすると、スマートフォンでも結果を確認できます。スマートフォンでは`「ファイルの選択」`ボタンでその場で撮った写真も認識可能です。

>URLは　＜アプリケーション名＞.mybluemix.net　となります。

>もし後からカスタムクラスのidを変更したい場合は、「4. アプリケーションのIBM Cloudへのデプロイ」を再度実施してください。



