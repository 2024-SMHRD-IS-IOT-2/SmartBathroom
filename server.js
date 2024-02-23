// require, import...
const express = require('express');
const app = express();
// const sessionRouter = require('./routes/session');
const session = require('express-session');
const fileStore = require('session-file-store')(session);


// Router require 정의(indexRouter, userRouter)
const indexRouter = require('./routes');
const userRouter = require('./routes/user');


// path, cors, body-parser require 정의
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// session
app.use(session({
    httpOnly : true,   // http 프로토콜을 통한 접근만 가능
    resave : false,   // 불필요한 세션 저장 방지
    secret : 'secret',  // 암호화 키
    store : new fileStore(),  // 세션 저장소
    cookie : {
        maxAge : 1000 * 60 * 60   // 세션 만료 1시간
    }

}));

// 정적인 파일을 가져오기 위한 미들웨어 
app.use(express.static(path.join(__dirname, 'react-project', 'build')));

// cors 오류 해결을 위한 미들웨어 
// 1) cors 모듈 설치 : npm i cors 
// 2) require 
// 3) 사용 
app.use(cors());
app.use(express.json());


// body-parser 미들웨어 대체 express 내장 모듈 
app.use(express.urlencoded({extended : true}));

// router 
app.use('/', indexRouter);
app.use('/user', userRouter);




// // 아두이노 데이터 받기 skeleton code
// app.get('/sensorData', (req, res) => {

//     console.log("receiving data");
//   const sensor1Value = req.query.sensor1;
//   const sensor2Value = req.query.sensor2;
//   console.log('Received sensor data from Arduino:');
//   console.log('Sensor 1:', sensor1Value);
//   console.log('Sensor 2:', sensor2Value);

//   // 받아서 저장할 데이터

//   // Send response to Arduino if needed
//   res.send('Data received successfully');
// });

// // 아두이노로 명령 보내기 skeleton code
// // 나중에 확인해보고 필요없으면 sensorData 반환값으로 처리해도 됨.
// app.get('/sensorCommand', (req, res) => {
//   // Send commands to Arduino if needed
//   console.log("sending data to arduino");
//   res.send('Sending from combined serverNode');
// });


//server



app.set('port', process.env.PORT || 3001); 
app.listen(app.get('port'), ()=>{
    console.log(`port waiting ... 😵 on ${app.get('port')}`);
});

