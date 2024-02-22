import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅을 사용합니다.

const LoginPage = () => {
  const [email, setEmail] = useState(''); // 이메일 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  // 로그인 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    console.log(`Email: ${email}, Password: ${password}`); // 콘솔에 이메일과 비밀번호 출력
    // 로그인 로직 구현 위치. 성공 시 페이지 이동 등의 처리를 여기에 추가합니다.

    
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 이메일 입력 상태 업데이트
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 상태 업데이트
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <button onClick={() => navigate('/join')}>회원가입</button> {/* 회원가입 페이지로 이동 */}
      <button onClick={() => navigate('/')}>홈으로</button> {/* 홈 페이지로 이동 */}
    </div>
  );
};

export default LoginPage;
