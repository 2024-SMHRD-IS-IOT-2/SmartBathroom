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
        res.json({ result: "admin", data: rows[0] });
      } else {
        // 회원 로그인
        console.log("회원입니다");
        res.json({ result: "success", data: rows[0] });
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
});

// 로그아웃 라우터
router.post('/handleLogout', (req, res) => {
  req.session.destroy();
  res.json({ result: 'success' })
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
      if (result.changedRows > 0 || result.affectedRows > 0) {
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

//수면시간대, 수면시간 불 밝기 조절
router.post("/handleSleep", (req, res) => {
  console.log("handleSleep:", req.body);
  const { userId, sleepTime, sleepLightening } = req.body;
  const sql = `UPDATE members SET sleep_time=?, 
               sleep_lightening=? WHERE member_id=?`;
  conn.query(sql, [sleepTime, sleepLightening, userId], (err, result) => {
    console.log("result:", result);
    if (result.changedRows > 0 || result.affectedRows > 0) {
      console.log("user.js 수면시간 정보 수정 완료");
      res.json({ result: "success" });
    } else {
      console.log("user.js 수면시간 정보 수정 실패");
      res.json({ result: "fail" });
    }
  });
});

//관리자 페이지 : 열람기능
router.post("/showList", (req, res) => {
  const sql = `Select *
                 from members where member_id!='admin'`;
  conn.query(sql, (err, rows) => {
    if (rows.length > 0) {
      res.json({ rows: rows, result: "success" });
      console.log("user.js 관리자가 열람할 회원정보 보냈습니다");
    } else {
      console.log("user.js showlist err :", err);
      res.json({ result: "fail" });
    }
  });
});

//관리자 페이지 : 현재 사고현황이 "Y" 인 유저만 반환
router.post("/updateAccidentStatus", (req, res) => {
  const sql = `select distinct member_id from accidents where acc_status = "Y"`;
  conn.query(sql, (err, rows) => {
    res.json({ result: "success", rows: rows });
  })
})

//사고 정보 보내기
router.post("/showAccident", (req, res) => {
  const { userId } = req.body;
  const sql = `select * from accidents where member_id=?`;
  conn.query(sql, [userId], (err, rows) => {
    if (rows.length > 0) {
      // console.log(rows);
      res.json({ rows: rows, result: "success" });
      console.log("user.js 관리자가 열람할 사고 정보 보냈습니다.");
    } else {
      res.json({ result: "none" });
      console.log("user.js 사고이력 없음");
    }
  });
});

//사고 정보 완료처리
router.post("/updateAccident", (req, res) => {
  const { acc_idx, acc_status, acc_info } = req.body;
  console.log(`pdateAccident ${acc_idx}, ${acc_info}, ${acc_status}`);

  const sql = `update accidents set acc_info=?, acc_status=? where acc_idx=?`

  conn.query(sql, [acc_info, acc_status, acc_idx], (err, result) => {
    console.log(result);
    if (result.changedRows > 0) {
      res.json({ result: "success" });
      console.log("user.js 사고정보 수정 완료", result.changedRows);
    } else {
      console.log("err:", err);
      res.json({ result: "fail" });
      console.log("user.js 사고정보 수정 실패");
    }
  })

})


// 아두이노 데이터 처리 
router.get("/sensorData", (req, res) => {
  console.log("receiving data");
  const { humidity, temp, nh3, meth, btnEmerg, falldown, member_id } = req.query;

  console.log("Received sensor data from Arduino:");
  console.log(req.query);

  // 받은 아이디값으로 sensor DB 저장
  const sql = `insert into sensors(sensor_humid, sensor_temp, sensor_nh3, member_id) 
                values (?,?,?,?)`;
  conn.query(sql, [humidity, temp, nh3, member_id],
    (err, rows) => {
      if (rows) {
        console.log(`user.js 센서저장 성공.  아이디: ${member_id}`);
      } else {
        console.log("user.js 센서저장실패", err);
      }
    }
  );

  // 받은 값으로 accidents 저장
  let accNote = "";
  if (btnEmerg === "1") accNote = "화장실 갇힘 감지"
  else if (falldown === "1") accNote = "넘어짐 감지"
  
  console.log(accNote);

  if (btnEmerg === "1" || falldown === "1"){
    const sql2 = `insert into accidents (acc_info, acc_status, member_id) 
    values (?,?,?)`;
    conn.query(sql2, [accNote, "Y", member_id],
      (err, rows) => {
        if (rows) {
          console.log(`user.js 사고저장 성공.  아이디: ${member_id}`);
        } else {
          console.log("user.js 사고저장실패", err);
        }
      }
    );
  }



  // 아두이노로 값 보내기.
  const sql3 = `select sleep_time, sleep_lightening from members where member_id=?`;
  conn.query(sql3, [member_id],
    (err, rows) => {
      if (rows) {
        // 수면시간 계산
        let dateTime = new Date();
        let startTime = rows[0].sleep_time.slice(0, 5);
        let endTime = rows[0].sleep_time.slice(6);
        let isSleepLight = false;

        startTime = parseInt(startTime.replace(":", ""));
        endTime = parseInt(endTime.replace(":", ""));
        let curTime = dateTime.getHours() * 100 + dateTime.getMinutes();

        if (curTime > startTime || curTime < endTime) isSleepLight = true;
        else isSleepLight = false;

        //수면등 여부 // 수면등 밝기 아두이노로 전송.
        res.send(`${isSleepLight}*${rows[0].sleep_lightening}*`);
      } else {
        console.log("user.js 센서값 업데이트 실패", err);
      }
    }
  );
});


module.exports = router;
