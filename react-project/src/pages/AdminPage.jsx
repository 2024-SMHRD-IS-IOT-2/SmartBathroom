import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅 사용
import axios from '../axios';

const AdminPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const [users, setUsers] = useState([]); // 사용자 데이터를 담을 상태 변수

  useEffect(async () => {
    
    try {
      await axios.post('/user/showList')
      .then((res)=>{
        if (res.data.result === "success"){
          console.log(res.data.rows);
          setUsers(res.data.rows); 
        }

      })
    
    } catch (error) {
      console.error('Error fetching user:', error);
    }

  }, []);

  // 정보 변경 페이지로 이동하며, 사용자 ID를 파라미터로 전달
  const goToChangeUiPage = (userId) => {
    navigate(`/changeui/${userId}`);
  };

  // 로그아웃 처리
  const logout = () => {
  // 로그아웃 로직 구현 위치
    alert('로그아웃 하였습니다');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'left', margin: '0', fontSize: '1.5em' }}>Manager</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginTop: '10px', position: 'absolute', top: '0', right: '20px' }}>
        <button onClick={() => navigate('/home')} style={{ fontSize: '1em', marginRight: '10px' }}>Home</button>
        <button onClick={() => navigate('/login')} style={{ fontSize: '1em' }}>Logout</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {users.map((user) => (
          <div key={user.member_id} onClick={() => goToChangeUiPage(user.id)} style={{ cursor: 'pointer', margin: '10px', border: '1px solid #ccc', padding: '10px', width: '30%', boxSizing: 'border-box' }}>
            <p>이름: {user.member_name}</p>
            <p>연락처: {user.member_phone}</p>
            <p>보호자 이름: {user.guardian_name}</p>
            <p>보호자 연락처:{user.guardian_phone}</p>
          </div>
        ))}
      </div>
    </div>
  );  
};

export default AdminPage;
