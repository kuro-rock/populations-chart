# populations-chart

![イメージ](https://user-images.githubusercontent.com/940915/82635740-df34bb80-9c3b-11ea-89a2-1cf83cf51881.png)

## 仕様
1. RESAS(地域経済分析システム) APIの「都道府県一覧」からAPIを取得する
2. APIレスポンスから都道府県一覧のチェックボックスを動的に生成する
3. 都道府県にチェックを入れると、RESAS APIから選択された都道府県の「人口構成」を取得する
4. 人口構成APIレスポンスから、X軸:年、Y軸:人口数の折れ線グラフを動的に生成して表示する

## 事前準備
RESAS(地域経済分析システム) APIのAPIキーを[取得](https://opendata.resas-portal.go.jp/form.html)し、
.envファイルに記述してroot上に配置してください。

### .env記述例
```
API_URL=https://opendata.resas-portal.go.jp/api/v1
API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

```
API_URLは固定です。API_KEYは取得したキーを記述してください。

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

