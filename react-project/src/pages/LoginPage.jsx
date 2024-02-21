import React, { useState } from 'react'; // useState를 가져옵니다.
import { useNavigate } from 'react-router-dom'; // useNavigate를 가져옵니다.
import axios from '../axios';

const LoginPage = () => {
  const [userId, setId] = useState(''); // 아이디 상태
  const [userPw, setPw] = useState(''); // 비밀번호 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
// 로그인 폼 제출 핸들러
const handleSubmit = async (e) => {
  e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

  if (userId.trim() === '' || userPw.trim() === '') {
    // 아이디나 비밀번호가 비어있는 경우
    alert('아이디와 비밀번호를 모두 입력해주세요.');
  } else {
    // 로그인 요청을 보냅니다.
    axios.post('/user/login', { userId, userPw })
      .then(response => {
        // 로그인에 성공했을 때
        alert('로그인에 성공했습니다.');
        navigate('/user'); // 유저 페이지로 이동
      });
      // 아이디와 비밀번호가 틀릴시 
    alert('아이디 또는 비밀번호가 올바르지 않습니다.');
  }
};



  return (
    <div>
      <h1 style={{ fontWeight: 'bold' }}>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id" style={{ fontWeight: 'bold' }}>아이디: </label>
          <input
            type="text"
            id="id"
            value={userId}
            onChange={(e) => setId(e.target.value)} // 아이디 입력 상태 업데이트
          />
        </div>
        <div>
          <label htmlFor="pw" style={{ fontWeight: 'bold' }}>비밀번호: </label>
          <input
            type="password"
            id="pw"
            value={userPw}
            onChange={(e) => setPw(e.target.value)} // 비밀번호 입력 상태 업데이트
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <button onClick={() => navigate('/join')} >회원가입</button> {/* 회원가입 페이지로 이동 */}
      <button onClick={() => navigate('/')} >메인화면</button> {/* 홈 이동 */}
    </div>
  );
};

export default LoginPage;
