import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅 사용
import axios from '../axios';
import { UserContext } from '../contexts/UserContext';
import AccList from '../components/AccList';
import AlertComponent from '../components/AlertComponent';

const AdminPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const [users, setUsers] = useState([]); // 사용자 데이터를 담을 상태 변수
  const [accidentUserId, setAccidentUserId] = useState([]);  //사고가 난 회원들 id
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 정보를 담을 상태 변수
  const [modalOpen, setModalOpen] = useState(false); // 모달 창이 열려있는지를 나타내는 상태 변수
  const {isLoggedin, trigAlert, setTrigAlert} = useContext(UserContext); // context 에 로그인 저장돼있음
  const [alertInfo, setAlertInfo] = useState({}); // 알림 메시지


    // 회원 사고리스트
    // 현재 사고가 나있는 회원들 목록 불러옴. (색깔 변경용)
  const refreshAccidentList = async () => {
      await axios.post('/user/updateAccidentStatus')
        .then((res) => {
          // [ { member_id: '12345' }, { member_id: 'q1q2' } ] rows format.
          if (res.data.result === "success") {
            setAccidentUserId((res.data.rows).map(user => user.member_id));
            if (res.data.rows.length > 0 ){
              setAlertInfo({
                message : "감지된 사고가 있습니다.",
                duration : "3000",
                backgroundColor : "red"
              })
              setTrigAlert(trigAlert=> !trigAlert);

            }

          }
        })
        .catch((err) => {
          console.log("fetchAccidentList", err);
        })
    }

  // 회원 리스트 렌더링
  // 회원 사고 리스트 5초마다 렌더링. 타이머 사용
  // 첫 렌더링시, 로그인안돼있을 경우 홈 페이지로 이동.
  useEffect(() => {
    console.log("isLoggedin", isLoggedin);
    if (!isLoggedin) {
      alert("로그인해주세요");
      navigate('/');
    }

    console.log("admin memberlist rendering");
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

    // initial rendering.
    fetchUsers();
    refreshAccidentList();

    //5초마다 사고리스트 업데이트
    const interval = setInterval(refreshAccidentList, 5000);
    return () => clearInterval(interval);

  }, []);

  // 모달을 열고 선택된 사용자 정보를 설정
  const openModal = async (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // 모달을 닫음
  const closeModal = () => {
    //회원 사고리스트 새로고침.
    refreshAccidentList();
    setModalOpen(false);
  };

  // 정보 변경 페이지로 이동하며, 사용자 ID를 파라미터로 전달
  const goToChangeUiPage = (selectedUserId) => {
    navigate(`/changeui`, { state: { data: selectedUser, from: "admin" } });
  };

  return (
    <div className={"admin-container"}>
      <AlertComponent alertInfo={alertInfo}/>
      <h1 className={"admin-title"}>회원 목록</h1>
  
      <div className={"admin-area-list"}>
        {users.map((user) => (
  
          <div key={user.member_id} onClick={() => openModal(user)}
            className={"admin-list-item"}
            style={{ backgroundColor: (accidentUserId.includes(user.member_id)) ? "lightcoral" : "lightgreen" }}>
            <p>이름: {user.member_name}</p>
            <p>연락처: {user.member_phone}</p>
            <p>보호자 이름: {user.guardian_name}</p>
            <p>보호자 연락처: {user.guardian_phone}</p>
          </div>
        ))}
      </div>
  
      {modalOpen && selectedUser && (
        <div className="admin-modal">
          <div className="admin-modal-content">
  
            {/* 왼쪽 :  유저정보 + 버튼 */}
            <div className="admin-modal-left">
              <span className="admin-modal-close" onClick={() => closeModal()}>×</span>
              <h2>회원 정보</h2>
              <p>이름: {selectedUser.member_name}</p>
              <p>연락처: {selectedUser.member_phone}</p>
              <p>보호자 이름: {selectedUser.guardian_name}</p>
              <p>보호자 연락처: {selectedUser.guardian_phone}</p>
              <button onClick={() => goToChangeUiPage(selectedUser.member_id)}>정보수정</button>
              <button onClick={() => closeModal()}>닫기</button>
            </div>
  
            {/* 오른쪽 : 사고 이력 */}
            <AccList member_id={selectedUser.member_id}/>

          </div>
        </div>
      )}
    </div>
  );
  
};

export default AdminPage;
