import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅 사용

const UserPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  // 차트 페이지로 이동
  const goToChartPage = () => {
    navigate('/chart');
  };

  // 정보 변경 페이지로 이동
  const goToChangeUiPage = () => {
    navigate('/changeui');
  };

  // 로그인 페이지로 이동하여 로그아웃 처리
  const logout = () => {
    // 로그아웃 로직 구현. 예를 들어, 로컬 스토리지에서 사용자 정보를 제거합니다.
    navigate('/login');
  };

  return (
    <div>
      <h1>사용자 페이지</h1>
      <button onClick={goToChartPage}>차트 보기</button> {/* 차트 페이지로 이동 */}
      <button onClick={goToChangeUiPage}>정보 변경</button> {/* 정보 변경 페이지로 이동 */}
      <button onClick={logout}>로그아웃</button> {/* 로그아웃 처리 및 로그인 페이지로 이동 */}
    </div>
  );
};

export default UserPage;
