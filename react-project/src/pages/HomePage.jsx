// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router v6의 useNavigate 훅을 임포트합니다.

function HomePage() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 함수를 가져옵니다.

  // 로그인 페이지로 이동하는 함수
  const goToLoginPage = () => {
    navigate('/login'); // '/login' 경로로 이동합니다.
  };

  return (
    <div>
      <h1>홈페이지</h1>
      <button onClick={goToLoginPage}>로그인</button> {/* 버튼 클릭 시 로그인 페이지로 이동 */}
    </div>
  );
}

export default HomePage; // HomePage 컴포넌트를 내보냅니다.
