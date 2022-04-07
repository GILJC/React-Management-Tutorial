const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const fs = require('fs'); // fs라는, 파일에 접근할 수 있는 라이브러리 불러옴.

app.use(bodyParser.json()); // 아래의 데이터를 주고받을 때 -> json형태로 주고받을 것
app.use(bodyParser.urlencoded({ extended: true}));
// 위처럼 기본적인 설정만으로도,
// 아래처럼 자바스크림트의 배열 데이터를 보내겠다고 넣어주기만 하면 -> 알아서 JSON형태로 변환해서 -> 클라이언트에게 보내준다

const data = fs.readFileSync('./database.json');  // 해당 파일을 읽어올 수 있게 함
const conf = JSON.parse(data); // 해당 환경설정 데이터를 파싱해서 가져올 수 있게 함
const mysql = require('mysql'); // mysql 라이브러리 불러와서 mysql 변수에 담음

const connection = mysql.createConnection({ // 연결을 수행해 줌
    host: conf.host,  // 위의 conf = database.json에서 파싱해서 가져온 정보
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();  // 실제 연결 수행

//app.get('/api/hello', (req, res) => {
app.get('/api/customers', (req, res) => {
    // res.send({message: 'Hello Express!'});  // /api/hello <- 에 접속하면 -> Hello Express! 라고 메세지 보일 수 있도록 만듬
    //res.send(
      // AWS RDS에 연결해서 받을거라, 아래의 하드코딩한 data는 삭제
      /*[
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1', // 임의의 이미지 보여주는 사이트, 64/64는 크기
            'name': '나동빈',
            'birthday': '961222',
            'gender': '남자',
            'job': '대학생'
          },
          { 
            'id': 2,
            'image': 'https://placeimg.com/64/64/2', 
            'name': '홍길동',
            'birthday': '960305',
            'gender': '남자',
            'job': '프로그래머'
          },
          {  
            'id': 3,
            'image': 'https://placeimg.com/64/64/3', 
            'name': '이순신',
            'birthday': '921205',
            'gender': '남자',
            'job': '디자이너'
          },
    ]*/
   // );
   connection.query(  // /api/customers에 접속하면, DB에 접속해서 query를 날릴 수 있게 함
      "SELECT * FROM CUSTOMER", // customer 테이블에 접속, 데이터 가져옴
      (err, rows, fields) => {  // 실제 가져온 data는 요 rows라는 변수로 처리할 수 있게 되는 것
        res.send(rows); // 모든 고객 데이터가 포함되어 있는 rows를, 그대로 사용자한태 보여주면 됨
      }// yarn dev로 다시 서버 시작...
   );

});

//app.listen(port, () => console.log('Listening on port ${port}')); // 따옴표가 아니라, 왼쪽 위 특수문자 넣어줘야 함
app.listen(port, () => console.log(`Listening on port ${port}`));
