/*
1. mysql 모듈 설치
npm install mysql2;

2. 모듈 가져오기
const mysql = require('mysql2');

3. db 정보 기재
*/

const mysql = require('mysql2');

const conn = mysql.createConnection({
        host : 'project-db-campus.smhrd.com',
        user:'campus_23IS_IoT2_P2_4',
        password:'smhrd4',
        port : '3307',
        database:'campus_23IS_IoT2_P2_4'
    })

conn.connect();


module.exports = conn;