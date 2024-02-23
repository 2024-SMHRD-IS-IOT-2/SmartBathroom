import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅 사용
import axios from '../axios';


const AdminPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const [users, setUsers] = useState([]); // 사용자 데이터를 담을 상태 변수
  const [accidents, setAccidents] = useState([]);
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
    
  //   conn.query("select id from accidents where id=?", ['asdf'], (err, rows)=>{
  //     console.log('rows', rows);
  // })
    fetchUsers();
  }, []);

  // 모달을 열고 선택된 사용자 정보를 설정
  const openModal = async (user) => {
    setSelectedUser(user);
    // showAccident

    await axios.post('/user/showAccident', {userId : user.member_id})
    .then((res)=>{
      if (res.data.result === "success"){
        // console.log(res.data.rows);
        setAccidents(res.data.rows);
        console.log(accidents);
      }
    })
    .catch((error)=>{
      console.log(error);
    });


    setModalOpen(true);
  };

  // 모달을 닫음
  const closeModal = () => {
    setModalOpen(false);
  };

  // 정보 변경 페이지로 이동하며, 사용자 ID를 파라미터로 전달
  const goToChangeUiPage = (selectedUserId) => {
    navigate(`/changeui`, {state:{data : selectedUser, from : "admin"}});
  };

  // 로그아웃 처리
  const logout = () => {
    // 로그아웃 로직 구현 위치
    alert('로그아웃 하였습니다');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'left', margin: '0', fontSize: '1.5em' }}>관리자 UI</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginTop: '10px', position: 'absolute', top: '0', right: '20px' }}>
        <button onClick={() => navigate('/home')} style={{ fontSize: '1em', marginRight: '10px' }}>메인화면</button>
        <button onClick={() => logout()} style={{ fontSize: '1em' }}>로그아웃</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {users.map((user) => (
        (true)?      
        (  // true
        <div key={user.member_id} onClick={() => openModal(user)} style={{ cursor: 'pointer', margin: '10px', border: '1px solid #ccc', padding: '10px', width: '30%', boxSizing: 'border-box', backgroundColor: 'lightgreen' }}>
        <p>이름: {user.member_name}</p>
        <p>연락처: {user.member_phone}</p>
        <p>보호자 이름: {user.guardian_name}</p>
        <p>보호자 연락처: {user.guardian_phone}</p>
      </div>
        )
        : ( //false
        <div key={user.member_id} onClick={() => openModal(user)} style={{ cursor: 'pointer', margin: '10px', border: '1px solid #ccc', padding: '10px', width: '30%', boxSizing: 'border-box', backgroundColor: 'lightred' }}>
        <p>이름: {user.member_name}</p>
        <p>연락처: {user.member_phone}</p>
        <p>보호자 이름: {user.guardian_name}</p>
        <p>보호자 연락처: {user.guardian_phone}</p>
      </div>)
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
            <button onClick={() => goToChangeUiPage(selectedUser.member_id)}>정보수정</button>
            <button onClick={() => closeModal()}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );  
};

export default AdminPage;
