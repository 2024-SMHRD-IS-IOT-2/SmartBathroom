const express = require("express");
const router = express.Router();
const conn = require("../config/database");

//default 값 : DB에 등록해서 주석처리
// const sleep_time = "23:00_06:00";
// const sleep_lightening = 50;

// 회원가입 라우터
router.post("/handleJoin", (req, res) => {
  console.log("user.js 회원가입 요청...", req.body);
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
      console.log("user.js 로그인 성공", rows[0]);

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
router.get("/getSession", (req, res) => {
  console.log("user.js : session data 내보냄.");
  res.json(req.session.loginInfo);
})

// 로그아웃 라우터
router.post('/handleLogout', (req, res)=>{
  req.session.destroy();
  res.json({result : 'success'})
});

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
  const sql = `UPDATE members
                 SET member_pw = ?, member_phone = ?, member_addr = ?,
                     member_height = ?, member_weight = ?, guardian_name = ?, 
                     guardian_phone = ?
                 WHERE member_id = ?`;
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
    ],
    (err, result) => {
      console.log(result);
      if (result.changedRows > 0) {
        res.json({ result: "success" });
        console.log("user.js 회원정보 수정 완료");
      } else {
        console.log("err:", err);
        res.json({ result: "fail" });
        console.log("user.js 회원정보 수정 실패");
      }
    }
  );
});

//관리자 페이지 : 열람기능
router.post("/showList", (req, res) => {
  console.log("showList", req.body);
  const sql = `Select *
                 from members where member_id!='admin'`;
  conn.query(sql, (err, rows) => {
    console.log(rows);
    if (rows.length > 0) {
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

//로그아웃 기능
router.get("/handleLogout", (req, res) => {
  req.session.destroy();
  res.json({ result: "success" });
});

// 아두이노 데이터 받기 skeleton code
/*
할 것 : db로 데이터 저장. session 에서 회원 id 받아서 저장.
*/
router.get("/sensorData", (req, res) => {
  console.log("receiving data");
  const {humidity,temp, nh3, meth, btnEmerg, falldown, member_id} = req.query;

  console.log('Received sensor data from Arduino:');
  console.log(req.query);


  // 받은 아이디값으로 DB 저장
  const sql = `insert into sensors(sensor_humid, sensor_temp, sensor_nh3, member_id) 
                values (?,?,?,?)`;
  conn.query( sql,[humidity, temp, nh3, member_id],
    (err, rows) => {
      if (rows) {
        console.log(`user.js 센서저장 성공.  아이디: ${member_id}`);
      } else {
        console.log("user.js 센서저장실패", err);
      }
    }
  );
  // 아두이노로 값 보내기.
  
  res.send('Data received successfully');

});

// 아두이노로 명령 보내기 skeleton code
// 나중에 확인해보고 필요없으면 sensorData 반환값으로 처리해도 됨.
router.get("/sensorCommand", (req, res) => {
  // Send commands to Arduino if needed
  console.log("sending data to arduino");
  res.send("Sending from combined serverNode");
});


module.exports = router;
