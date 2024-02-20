import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅 사용
import './App.css';

const AdminPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  // 예제를 위한 하드코딩된 사용자 데이터
  const users = [
    { id: 1, name: '유저 1', email: 'user1@example.com' },
    { id: 2, name: '유저 2', email: 'user2@example.com' },
    { id: 3, name: '유저 3', email: 'user3@example.com' },
    { id: 4, name: '유저 4', email: 'user4@example.com' },
    { id: 5, name: '유저 5', email: 'user5@example.com' },
    { id: 6, name: '유저 6', email: 'user6@example.com' },
    { id: 7, name: '유저 7', email: 'user7@example.com' },
    { id: 8, name: '유저 8', email: 'user8@example.com' },
    { id: 9, name: '유저 9', email: 'user9@example.com' },
    { id: 10, name: '유저 10', email: 'user10@example.com' }
  ];

  // 정보 변경 페이지로 이동하며, 사용자 ID를 파라미터로 전달
  const goToChangeUiPage = (userId) => {
    navigate(`/changeui/${userId}`);
  };

  // 로그아웃 처리
  const logout = () => {
    // 로그아웃 로직 구현 위치
    navigate('/login');
  };

  return (
    <div>
      <h1>관리자 페이지</h1>
      {users.map((user) => (
        <div key={user.id} onClick={() => goToChangeUiPage(user.id)} style={{ cursor: 'pointer', margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
          <p>이름: {user.name}</p>
          <p>이메일: {user.email}</p>
        </div>
      ))}
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};

export default AdminPage;
