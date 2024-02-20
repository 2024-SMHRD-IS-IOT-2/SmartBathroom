const express = require("express");
const router = express.Router();

router.post('/select', (req, res) => {
    // 더미 정보 리스트
    // DB 연동 코드 추가

    // 더미 데이터
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

module.exports = router;
