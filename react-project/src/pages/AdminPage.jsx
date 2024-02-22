import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅 사용
import axios from '../axios';

const AdminPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  // 예제를 위한 하드코딩된 사용자 데이터
  // 관리자페이지 : (관리대상)이름,보호자이름,연락처 
  const users = [
    { id: 1, name: '유저 1', guardianName: '보호자 1', contact: '010-1234-5678' },
    { id: 2, name: '유저 2', guardianName: '보호자 2', contact: '010-2345-6789' },
    { id: 3, name: '유저 3', guardianName: '보호자 3', contact: '010-3456-7890' },
    { id: 4, name: '유저 4', guardianName: '보호자 4', contact: '010-4567-8901' },
    { id: 5, name: '유저 5', guardianName: '보호자 5', contact: '010-5678-9012' },
    { id: 6, name: '유저 6', guardianName: '보호자 6', contact: '010-6789-0123' }
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'left', margin: '0', fontSize: '1.5em' }}>관리자</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginTop: '10px', position: 'absolute', top: '0', right: '20px' }}>
        <button onClick={() => navigate('/home')} style={{ fontSize: '1em', marginRight: '10px' }}>Home</button>
        <button onClick={logout} style={{ fontSize: '1em' }}>Logout</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {users.map((user) => (
          <div key={user.id} onClick={() => goToChangeUiPage(user.id)} style={{ cursor: 'pointer', margin: '10px', border: '1px solid #ccc', padding: '10px', width: '30%', boxSizing: 'border-box' }}>
            <p>이름: {user.name}</p>
            <p>보호자 이름: {user.guardianName}</p>
            <p>연락처: {user.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );  
};

export default AdminPage;
