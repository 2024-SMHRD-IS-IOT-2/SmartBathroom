const express = require("express");
const router = express.Router();
const conn = require("../config/database");

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
router.post("/handleLogout", (req, res) => {
  req.session.destroy();
  res.json({ result: "success" });
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

//차트페이지 접속시?
router.post("/handleChartPage", (req, res) => {
  const { userId } = req.body;
  const sql = `select * from sensors where member_id=?`;
  conn.query(sql, [userId], (err, rows) => {
    if (rows.length > 0) {
      console.log("success", rows);
      res.json({ rows: rows, result: "success" });
    } else {
      console.log("fail");
      console.log("err:", err);
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
  });
});

//사고 정보 보내기
router.post("/showAccident", (req, res) => {
  const { userId } = req.body;
  const sql = `select * from accidents where member_id=?`;
  conn.query(sql, [userId], (err, rows) => {
    if (rows.length > 0) {
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

  const sql = `update accidents set acc_info=?, acc_status=? where acc_idx=?`;

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
  const { humidity, temp, nh3, meth, btnEmerg, falldown, member_id } =
    req.query;

  console.log("Received sensor data from Arduino:");
  console.log(req.query);

  // 받은 아이디값으로 DB 저장
  const sql = `insert into sensors(sensor_humid, sensor_temp, sensor_nh3, member_id) 
                values (?,?,?,?)`;
  conn.query(sql, [humidity, temp, nh3, member_id], (err, rows) => {
    if (rows) {
      console.log(`user.js 센서저장 성공.  아이디: ${member_id}`);
    } else {
      console.log("user.js 센서저장실패", err);
    }
  });
  // 아두이노로 값 보내기.

  const sql2 = `select sleep_time, sleep_lightening from members where member_id=(?)`;
  conn.query(sql2, [member_id], (err, rows) => {
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
  });

  res.send("Data received successfully");
});

module.exports = router;

//////////////////이 이하는 작업중 내지 더미////////////

// //회원정보 기능
// router.get("/showMember", (req, res) => {
//   console.log("showMember data", req.query);
//   //if (req.query.userId !== "admin") {
//   if (userId !== "admin") {
//     //관리자 아닐 경우 = 특정 회원만
//     const sql = `select * from members
//           where member_id =?`;
//     //conn.query(sql, [req.query.userId], (err, rows) => {
//     conn.query(sql, ["1234"], (err, rows) => {
//       console.log("err", err);
//       console.log("rows", rows);
//       res.json({ result: rows });
//     });
//   } else {
//     //관리자 = 전체회원 검색
//     const sql = `select * from members where member_id != "admin"`;
//     conn.query(sql, (err, rows) => {
//       console.log("err", err);
//       console.log("rows", rows);
//       res.json({ result: rows });
//     });
//   }
// });

// // 탈퇴 라우터
// // DB연동 추가
// //회원탈퇴 기능
// router.post("/handleDelete", (req, res) => {
//   console.log("delete data", req.body);
//   const { userId, userPw } = req.body;
//   const sql = `delete from members where member_id=? and member_pw=?`;
//   conn.query(sql, [userId, userPw], (err, rows) => {
//     console.log("rows", rows);
//     if (rows.affectedRows > 0) {
//       res.redirect("/");
//     } else {
//       res.send(`<script>
//             alert('존재하지 않는 회원정보입니다.');
//             location.href='/delete';
//             </script>`);
//     }
//   });
// });

// 차트 데이터 조회 라우터
// DB 연동 코드 추가

// 차트 UI페이지 차트 유형
// 유형 ,저장 및 공유
// DB 연동 코드 추가

// router.post('/select', (req, res) => {
// // 회원 정보 리스트
//     // DB 연동 코드 추가
//         // => 더미 데이터
//     let rows = [
//         { id: 'test1', name: '유저 1' },
//         { id: 'test2', name: '유저 2' },
//         { id: 'test3', name: '유저 3' },
//         { id: 'test4', name: '유저 4' },
//         { id: 'test5', name: '유저 5' },
//         { id: 'test6', name: '유저 6' },
//         { id: 'test7', name: '유저 7' },
//         { id: 'test8', name: '유저 8' },
//         { id: 'test9', name: '유저 9' },
//         { id: 'test10', name: '유저 10' }
//     ];

//     res.json({ rows: rows });
// });

// // 개인정보 수정(ChangeUi) - selectedId 있는 버전
// router.post("/handleModify", (req, res) => {
//   console.log("Modify Member Info", req.body);
//   const {
//     userPw,
//     userNumber,
//     addr,
//     height,
//     weight,
//     guardianName,
//     guardianNumber,
//     userId,
//     selectedId,
//   } = req.body;
//   //일반 회원
//   if (!selectedId) {
//   const sql = `UPDATE members
//                  SET member_pw = ?, member_phone = ?, member_addr = ?,
//                      member_height = ?, member_weight = ?, guardian_name = ?,
//                      guardian_phone = ?
//                  WHERE member_id = ?`;
//   conn.query(
//     sql,
//     [
//       userPw,
//       userNumber,
//       addr,
//       height,
//       weight,
//       guardianName,
//       guardianNumber,
//       userId,
//     ],
//     (err, result) => {
//       console.log(result);
//       if (result.changedRows > 0) {
//         res.json({ result: "success" });
//         console.log("user.js 회원정보 수정 완료");
//       } else {
//         console.log("err:", err);
//         res.json({ result: "fail" });
//         console.log("user.js 회원정보 수정 실패");
//       }
//     }
//   );
//   관리자
//   } else {
//     const sql = `UPDATE members
//                  SET member_pw = ?, member_phone = ?, member_addr = ?,
//                      member_height = ?, member_weight = ?, guardian_name = ?,
//                      guardian_phone = ? where member_id=?`;
//     conn.query(
//       sql,
//       [
//         userPw,
//         userNumber,
//         addr,
//         height,
//         weight,
//         guardianName,
//         guardianNumber,
//         selectedId,
//       ],
//       (err, result) => {
//         console.log(result);
//         if (result.changedRows > 0) {
//           res.json({ result: "success" });
//           console.log("user.js 회원정보 수정 완료 관리자");
//         } else {
//           console.log("err:", err);
//           res.json({ result: "fail" });
//           console.log("user.js 회원정보 수정 실패 관리자");
//         }
//       }
//     );
//   }
// });
