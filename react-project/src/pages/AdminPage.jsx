import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅 사용
import axios from '../axios';

const AdminPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const [users, setUsers] = useState([]); // 사용자 데이터를 담을 상태 변수
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 정보를 담을 상태 변수
  const [modalOpen, setModalOpen] = useState(false); // 모달 창이 열려있는지를 나타내는 상태 변수

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post('/user/showList');
        if (response.data.result === "success") {
          setUsers(response.data.rows);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUsers();
  }, []);

  // 모달을 열고 선택된 사용자 정보를 설정
  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // 모달을 닫음
  const closeModal = () => {
    setModalOpen(false);
  };

  // 정보 변경 페이지로 이동하며, 사용자 ID를 파라미터로 전달
  const goToChangeUiPage = (selectedUser) => {
    console.log(selectedUser);
    // navigate(`/changeui/` , {state : selectedUser});
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
        <button onClick={() => logout()} style={{ fontSize: '1em' }}>Logout</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {users.map((user) => (
          <div key={user.member_id} onClick={() => openModal(user)} style={{ cursor: 'pointer', margin: '10px', border: '1px solid #ccc', padding: '10px', width: '30%', boxSizing: 'border-box' }}>
            <p>이름: {user.member_name}</p>
            <p>연락처: {user.member_phone}</p>
            <p>보호자 이름: {user.guardian_name}</p>
            <p>보호자 연락처: {user.guardian_phone}</p>
          </div>
        ))}
      </div>
      {modalOpen && selectedUser && (
        <div className="modal" style={{ position: 'fixed', zIndex: 999, backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '100px', borderRadius: '5px' }}>
            <span className="close" onClick={() => closeModal()} style={{ cursor: 'pointer', position: 'absolute', top: '10px', right: '10px' }}>×</span>
            <p>이름: {selectedUser.member_name}</p>
            <p>연락처: {selectedUser.member_phone}</p>
            <p>보호자 이름: {selectedUser.guardian_name}</p>
            <p>보호자 연락처: {selectedUser.guardian_phone}</p>
            <button onClick={() => goToChangeUiPage(selectedUser)}>정보수정</button>
            <button onClick={() => closeModal()}>Close</button>
          </div>
        </div>
      )}
    </div>
  );  
};

export default AdminPage;
