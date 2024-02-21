const express = require("express");
const router = express.Router();
const conn = require("../config/database");

// 회원가입 시, ID 중복체크
    // DB연동 추가

// 회원가입 라우터
    // DB 연동 코드 추가

//회원가입 기능
router.post("/handleSignUp", (req, res) => {
    console.log("signup data : ", req.body);
    const { member_id, member_pw, menber_name,member_phone,
          member_birthdate, member_addr, member_height,member_weight,
          guardian_name, guardian_phone, sleep_time,sleep_lightening,
          joined_at
              } = req.body;
  
    //회원 중복 검사
    const sql = `select member_id from members where member_id=?`;
    conn.query(sql, member_id, (err, rows) => {
      if (rows.length > 0) {
        res.send(`<script>
          alert('이미 사용중인 아이디입니다');
          location.href='/signup';
          </script>`);
      } else {
        const sql = `insert into members values 
                  (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        conn.query(sql, [member_id, member_pw, menber_name,member_phone,
          member_birthdate, member_addr, member_height,member_weight,
          guardian_name, guardian_phone, sleep_time,sleep_lightening,
          joined_at], (err, rows) => {
          //  console.log("rows", rows);
          //  console.log("error", err);
          if (rows) {
            console.log("회원가입 성공");
            res.redirect("/");
          } else {
            console.log("회원가입 실패");
            res.send(`<script>alert("회원가입 실패"); 
              location.href='/signup';
              </script>`);
            //alert는 브라우저 내에 내장된 기능인데 node.js는 브라우저 밖에서 작업하는 것이므로 alert를 실행하기 위해 script 태그를 보내주는 것
          }
        });
      }
    });
  });    


// 로그인 라우터
    // DB 연동 코드 추가
    // 로그인 성공
    // 로그인 실패

    router.post("/handleSignIn", (req, res) => {
        console.log("signin data", req.body);
        const { member_id, member_pw } = req.body;
        const sql = `select member_id from members where
                      member_id =? and member_pw=?`;
        conn.query(sql, [member_id, member_pw], (err, rows) => {
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
      });

// 로그아웃 라우터

//로그아웃 기능
router.get('/signOut',(req,res)=>{
    req.session.destroy();
    res.redirect('/'); //세션 다 삭제되었으므로 redirect 명령어가 잘 작동됨
  })

//회원목록 기능
router.get("/showList", (req, res) => {
    console.log("showList data", req.query);
    if (req.query.member_id!=='admin') {
      //관리자 아닐 경우 = 특정 회원만
      const sql = `select * from members
          where member_id =?`;
      conn.query(sql, [req.query.member_id], (err, rows) => {
        console.log("err", err);
        console.log("rows", rows);
        res.render("list", {rows: rows});
      })
    } else {
      //관리자 = 전체회원 검색
      const sql = `select * from members`;
      conn.query(sql, (err, rows) => {
        console.log("err", err);
        console.log("rows", rows);
        res.render("list", {rows: rows});
      })
    }
  })


// 탈퇴 라우터 
    // DB연동 추가
//회원탈퇴 기능
router.post('/handleDelete',(req,res)=>{
    console.log('delete data',req.body);
    const {member_id,member_pw} = req.body;
    const sql = `delete from members where member_id=? and member_pw=?`
    conn.query(sql,[member_id,member_pw],(err,rows)=>{
        console.log('rows',rows);
        if(rows.affectedRows>0){
            res.redirect('/');
        }else{
            res.send(`<script>
            alert('존재하지 않는 회원정보입니다.');
            location.href='/delete';
            </script>`);
        }
    })
})


///////////일단 이 밑으로는 아직 작업중.....//////




// 회원정보 수정
    router.post('/modify',(req,res)=>{
        console.log("Modify Member Info", req.body);
        const { member_pw, member_phone, member_addr, 
            member_height,member_weight,guardian_phone,guardian_name,
        sleep_time,sleep_lightening } = req.body;
//////////////////여기서 막힘////////////////////////////
        const sql = `update members set ${변수} = ${변경값} from 
                     members where member_id =? and member_pw=?`;
        conn.query(sql, [{변수},member_id, member_pw], (err, rows) => {
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
        res.json({result:'success'});
      });

    

// 차트 데이터 조회 라우터
    // DB 연동 코드 추가

// 차트 UI페이지 차트 유형 
    // 유형 ,저장 및 공유 
    // DB 연동 코드 추가


router.post('/join',(req,res)=>{
    console.log(req.body);
    res.json({msg:'success'})
})

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
