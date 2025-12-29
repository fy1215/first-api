# first-api

映画データを管理するREST API

## 技術スタック

- Node.js
- Express
- MongoDB (Mongoose)

## 機能

- GET /movies - 映画一覧取得
- GET /movies/:id - 映画詳細取得
- POST /movies - 映画追加
- PUT /movies/:id - 映画更新
- DELETE /movies/:id - 映画削除

## セットアップ
```bash
npm install
```

`.env`ファイルを作成：
```
MONGODB_URI=your_mongodb_connection_string
```

## 起動
```bash
nodemon index.js
```

サーバー: http://localhost:3000
