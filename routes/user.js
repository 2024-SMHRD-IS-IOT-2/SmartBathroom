const express = require("express");
const router = express.Router();
// 회원가입 시, ID 중복체크
    // DB연동 추가

// 회원가입 라우터
    // DB 연동 코드 추가

// 로그인 라우터
    // DB 연동 코드 추가
    // 로그인 성공
    // 로그인 실패

// 로그아웃 라우터

// 회원정보 (이름,이메일) 수정
    // DB 연동 코드 추가

// 회원 탈퇴 라우터
    // DB 연동 코드 추가

// 차트 데이터 조회 라우터
    // DB 연동 코드 추가
// 차트 UI페이지 차트 유형 
    // 유형 ,저장 및 공유 
    // DB 연동 코드 추가


router.post('/join',(req,res)=>{
    console.log(req.body);
    res.json({msg:'success'})
})

router.post('/select', (req, res) => {
// 회원 정보 리스트
    // DB 연동 코드 추가
        // => 더미 데이터
    let rows = [
        { id: 'test1', name: '유저 1' },
        { id: 'test2', name: '유저 2' },
        { id: 'test3', name: '유저 3' },
        { id: 'test4', name: '유저 4' },
        { id: 'test5', name: '유저 5' },
        { id: 'test6', name: '유저 6' },
        { id: 'test7', name: '유저 7' },
        { id: 'test8', name: '유저 8' },
        { id: 'test9', name: '유저 9' },
        { id: 'test10', name: '유저 10' }
    ];

    res.json({ rows: rows });
});

// 탈퇴 라우터 
    // DB연동 추가
module.exports = router;
