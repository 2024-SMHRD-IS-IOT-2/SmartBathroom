

const express = require("express");
const router = express.Router();
const conn = require("../config/database");


// 회원가입 시, ID 중복체크
// DB연동 추가


// 회원가입 라우터
router.post('/handleJoin', (req, res) => {
  console.log('user.js 회원가입 요청...', req.body);
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
    guardianNumber
  } = req.body;
  let birthDate2 = birthDate.replace(/\//g, '-');
  const sql = `select member_id from members where member_id=?`;
  conn.query(sql, [userId], (err, rows) => {
    if (rows.length > 0) {
      //중복 : dup , 고유값 : uniq
      //현재는 db에 연결되어 있지 않으므로 id 중복체크를
      //실질적으로 하지 않고 임의의 값을 넣어서 작동하게
      //만든 것
      res.json({ result: 'dup' });
      console.log('user.js 같은 아이디가 이미 존재합니다');
    } else {
      const sql = `insert into members(
          member_id,member_pw,member_name,member_phone,member_birthdate,
          member_addr, member_height, member_weight, guardian_name,
          guardian_phone, sleep_time, sleep_lightening) values 
        (?,?,?,?,?,?,?,?,?,?,?,?)`;
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
          sleep_time,
          sleep_lightening
        ],
        (err, rows) => {
          if (rows) {
            console.log("user.js 회원가입 성공");
            res.json({ result: 'success' });
          } else {
            console.log("user.js 회원가입 실패", err);
            res.json({ result: 'fail' });
          }
        });
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

    // members 테이블에 로그인 정보가 있을 시
    if (rows.length > 0) {
      console.log("user.js 로그인 성공", rows[0]);

      // session 에 저장.
      req.session.loginInfo = rows[0];
      
      if (userId === 'admin') {
        console.log('admin입니다');
        res.json({ result: "admin"});
      } else {
        console.log('회원입니다');
        res.json({ result: "success"});
      }
    } else {
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



//회원목록 기능
router.get("/showList", (req, res) => {
  console.log("showList data", req.query);
  if (req.query.userId !== "admin") {
    //관리자 아닐 경우 = 특정 회원만
    const sql = `select * from members
          where member_id =?`;
    conn.query(sql, [req.query.userId], (err, rows) => {
      console.log("err", err);
      console.log("rows", rows);
      res.render("list", { rows: rows });
    });
  } else {
    //관리자 = 전체회원 검색
    const sql = `select * from members`;
    conn.query(sql, (err, rows) => {
      console.log("err", err);
      console.log("rows", rows);
      res.render("list", { rows: rows });
    });
  }
});

// 탈퇴 라우터
// DB연동 추가
//회원탈퇴 기능
router.post("/handleDelete", (req, res) => {
  console.log("delete data", req.body);
  const { userId, userPw } = req.body;
  const sql = `delete from members where member_id=? and member_pw=?`;
  conn.query(sql, [userId, userPw], (err, rows) => {
    console.log("rows", rows);
    if (rows.affectedRows > 0) {
      res.redirect("/");
    } else {
      res.send(`<script>
            alert('존재하지 않는 회원정보입니다.');
            location.href='/delete';
            </script>`);
    }
  });
});

///////////일단 이 밑으로는 아직 작업중.....//////

// 회원정보 수정
router.post("/modify", (req, res) => {
  console.log("Modify Member Info", req.body);
  const {
    member_pw,
    member_phone,
    member_addr,
    member_height,
    member_weight,
    guardian_phone,
    guardian_name,
    sleep_time,
    sleep_lightening,
  } = req.body;
  //////////////////여기서 막힘////////////////////////////
  const sql = `update members set ${변수} = ${변경값} from 
                     members where member_id =? and member_pw=?`;
  conn.query(sql, [{ 변수 }, member_id, member_pw], (err, rows) => {
    /////////////////챗선샌님의 해결책//////////////////////
    // const sql = `UPDATE members
    //              SET member_pw = ?, member_phone = ?, member_addr = ?,
    //                  member_height = ?, member_weight = ?, guardian_phone = ?, guardian_name = ?,
    //                  sleep_time = ?, sleep_lightening = ?
    //              WHERE member_id = ? and member_pw= ?`;
    //         conn.query(sql,[member_pw, member_phone, member_addr,
    //             member_height, member_weight, guardian_phone, guardian_name,
    //             sleep_time, sleep_lightening, memberId], (err, result) => {
    ////////////////여기까지가 챗선샌님의 대답///////////////
    // console.log("err", err);
    // console.log("rows", rows);
    if (rows.length > 0) {
      console.log("로그인 성공");
      // res.redirect("/"); //서버 단에서 작동하는 것 세션 작업 후에는 잘 작동 안 되므로 클라이언트 측에서 작동하는 JS형태의 location.href 명령어 써 주자
      res.send(`<script>location.href='/'</script>`);
    } else {
      console.log("로그인 실패");
      res.send(`<script>
                  alert('로그인 실패');
                  location.href = '/signin';
                  </script>
                  `);
    }
  });
  res.json({ result: "success" });
});

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

module.exports = router;
