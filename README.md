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
### 1. edit `manifest.yml`
watson-vr-nodeフォルダにある`manifest.yml`を2箇所変更して保存します。
#### 1-1) 3行目　<Set Your Application Name>
ご自分のアプリケーション名に変更します。アプリケーション名はURLの先頭部分となるため、bluemix.net内でユニークな値である必要があります。
自分のIBM CloudのID等と組みわせて、ユニークになるような名前にしてください。前後の`<>`は不要です。<br/>
例: 
```
- name: myid-watson-vr
````

#### 1-2) 8行目　<Set Your CLASSIFIER_ID>
Visual RecognitionのカスタムクラスのIDを記入します。

2で[Watson Visual Recognition カスタムクラスを作ろう!](https://qiita.com/nishikyon/items/7d1c07e2f50c1002e815)を参照してカスタムクラスを作成した場合は、
[11. モデルの表示](https://qiita.com/nishikyon/items/7d1c07e2f50c1002e815#11-%E3%83%A2%E3%83%87%E3%83%AB%E3%81%AE%E8%A1%A8%E7%A4%BA) と[12. Classifier IDの取得](https://qiita.com/nishikyon/items/7d1c07e2f50c1002e815#12-classifier-id%E3%81%AE%E5%8F%96%E5%BE%97)の手順に従い、Classifier IDをコピーしペーストします。


カスタムクラスを作成していない場合は、IBMが提供している食物に特化したカスタムクラスのid,`food`を記入します。前後の`<>`は不要です。<br/>
例　カスタムクラスを作成した場合: 
```
env:
    CLASSIFIER_ID: DefaultCustomModel_1941703287
````

例　カスタムクラスを作成していない場合: 
```
env:
    CLASSIFIER_ID: food
````

全体例:
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

### 2. IBM Cloudへの ログイン
以下のコマンドを入力してください。
```
ibmcloud login -r us-south
```
作成したアカウントのメールアドレスやパスワードを入力しログインしてください。

次に以下のコマンドを入力してください。
```
ibmcloud target --cf
```
### 3. IBM Cloudへの アプリケーションのアップロード
アプリケーションをIBM Cloudへアップロードします。以下のコマンドを入力してください。
```
ibmcloud cf push
```
Visual Recognitionとのバインドが済んでいないため、開始は`失敗`となりますが、ここでは問題ありません。

> ５のバインド実施後に再プッシュする場合(CLASSIFIER_IDを変更する場合など）は正常に開始されます。


## 5. Visual Recognition サービスのバインドとアプリケーションの開始

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



