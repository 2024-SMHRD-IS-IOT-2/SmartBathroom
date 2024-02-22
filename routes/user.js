const express = require("express");
const router = express.Router();
const conn = require("../config/database");

//default 값 : DB에 등록해서 주석처리
// const sleep_time = "23:00_06:00";
// const sleep_lightening = 50;

// 회원가입 라우터

router.post("/handleJoin", (req, res) => {
  console.log("회원가입 요청...", req.body);
  const {
    userId,
    userPw,
    userName,
    userNumber,
    birthDate,
    addr,
    height,
    weight,
    guardianName,
    guardianNumber,
  } = req.body;
  let birthDate2 = birthDate.replace(/\//g, "-");
  const sql = `select member_id from members where member_id=?`;
  conn.query(sql, [userId], (err, rows) => {
    if (rows.length > 0) {
      //중복 : dup , 고유값 : uniq
      res.json({ result: "dup" });
      console.log("같은 아이디가 이미 존재합니다");
    } else {
      const sql = `insert into members(
        member_id,member_pw,member_name,member_phone,member_birthdate,
        member_addr, member_height, member_weight, guardian_name,
        guardian_phone) values 
      (?,?,?,?,?,?,?,?,?,?)`;
      conn.query(
        sql,
        [
          userId,
          userPw,
          userName,
          userNumber,
          birthDate2,
          addr,
          height,
          weight,
          guardianName,
          guardianNumber,
        ],
        (err, rows) => {
          if (rows) {
            console.log("user.js 회원가입 성공");
            res.json({ result: "success" });
          } else {
            console.log("user.js 회원가입 실패", err);
            res.json({ result: "fail" });
          }
        }
      );
    }
  });
});

// 로그인 라우터

router.post("/handleLogin", (req, res) => {
  console.log("user.js 로그인 요청", req.body);
  const { userId, userPw } = req.body;

  const sql = `select * from members where
                      member_id =? and member_pw=?`;
  conn.query(sql, [userId, userPw], (err, rows) => {
    // console.log("err", err);
    // console.log("rows", rows);
    if (rows.length > 0) {
      // members 테이블에 로그인 정보가 있을 경우
      console.log("user.js 로그인 성공",rows[0]);
      
      // session 에 저장.
      req.session.loginInfo = rows[0];

      // 관리자 로그인
      if (userId === "admin") {
        console.log("admin입니다");
        res.json({ result: "admin" });
      } else {
        // 회원 로그인
        console.log("회원입니다");
        res.json({ result: "success" });
      }
    } else {
      // 로그인 실패
      console.log("로그인 실패");
      res.json({ result: "fail" });
    }
  });
});

// 세션 데이터 
router.get('/getSession', (req, res)=>{
  console.log("user.js : session data 내보냄.");
  res.json(req.session.loginInfo);
})

// 로그아웃 라우터
router.post('/handleLogout', (req, res)=>{
  req.session.destroy();
  res.json({result : 'success'})
})


// 개인정보 수정(ChangeUi)
router.post("/handleModify", (req, res) => {
  console.log("Modify Member Info", req.body);
  const {
    userPw,
    userNumber,
    addr,
    height,
    weight,
    guardianName,
    guardianNumber,
    userId,
    
  } = req.body;
  //일반 회원
  if (userId !== "admin") {
    const sql = `UPDATE members
                 SET member_pw = ?, member_phone = ?, member_addr = ?,
                     member_height = ?, member_weight = ?, guardian_name = ?, 
                     guardian_phone = ?
                 WHERE member_id = ? and member_pw= ?`;
    conn.query(
      sql,
      [
        userPw,
        userNumber,
        addr,
        height,
        weight,
        guardianName,
        guardianNumber,
        userId,
        userPw,
      ],
      (err, result) => {
        console.log(result);
        if (result.changedRows > 0) {
          res.json({ result: "success" });
          console.log("user.js 회원정보 수정 완료 일반회원");
        } else {
          console.log("err:", err);
          res.json({ result: "fail" });
          console.log("user.js 회원정보 수정 실패 일반회원");
        }
      }
    );
    //관리자
  } else {
    const sql = `UPDATE members
                 SET member_pw = ?, member_phone = ?, member_addr = ?,
                     member_height = ?, member_weight = ?, guardian_name = ?, 
                     guardian_phone = ?`;
    conn.query(
      sql,
      [userPw, userNumber, addr, height, weight, guardianName, guardianNumber],
      (err, result) => {
        console.log(result);
        if (result.changedRows > 0) {
          res.json({ result: "success" });
          console.log("user.js 회원정보 수정 완료 관리자");
        } else {
          console.log("err:", err);
          res.json({ result: "fail" });
          console.log("user.js 회원정보 수정 실패 관리자");
        }
      }
    );
  }
});

//관리자 페이지 : 열람기능
router.post("/adminPage", (req, res) => {
  console.log("Admin Page", req.body);
  const sql = `Select *
                 from members`;
  conn.query(sql, (err, rows) => {
    console.log(rows);
    if (rows.length = 0) {
      console.log(rows);
      res.json({ rows: rows, result: "success" });
      console.log("user.js 관리자가 열람할 회원정보 보냈습니다");
    } else {
      console.log("err:", err);
      res.json({ result: "fail" });
      console.log("user.js 오류발생");
    }
  });
});


// 아두이노 데이터 받기 skeleton code
/*
할 것 : db로 데이터 저장. session 에서 회원 id 받아서 저장.
*/
router.get('/sensorData', (req, res) => {
  console.log("receiving data");
  const sensor1Value = req.query.sensor1;
  const sensor2Value = req.query.sensor2;
  console.log('Received sensor data from Arduino:');
  console.log('Sensor 1:', sensor1Value);
  console.log('Sensor 2:', sensor2Value);

  // 받아서 저장할 데이터

  // Send response to Arduino if needed
  res.send('Data received successfully');
});

// 아두이노로 명령 보내기 skeleton code
// 나중에 확인해보고 필요없으면 sensorData 반환값으로 처리해도 됨.
router.get('/sensorCommand', (req, res) => {
  // Send commands to Arduino if needed
  console.log("sending data to arduino");
  res.send('Sending from combined serverNode');
});




//////////////////이 이하는 작업중 내지 더미////////////


//회원정보 기능
router.get("/showMember", (req, res) => {

});

// 탈퇴 라우터
// DB연동 추가
//회원탈퇴 기능
router.post("/handleDelete", (req, res) => {

});

// 차트 데이터 조회 라우터
// DB 연동 코드 추가

// 차트 UI페이지 차트 유형
// 유형 ,저장 및 공유
// DB 연동 코드 추가

module.exports = router;
