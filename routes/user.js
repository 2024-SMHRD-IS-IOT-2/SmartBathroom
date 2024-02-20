const express = require("express");
const router = express.Router();

router.post('/select', (req, res) => {
    // DB 연동 코드 추가

    // 더미 데이터
    let rows = [
        { id: 'test1', name: '유저 1' },
        { id: 'test2', name: '유저 2' },
    ];

    res.json({ rows: rows });
});





module.exports = router;
