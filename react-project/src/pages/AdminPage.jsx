import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅 사용
import axios from '../axios';


const AdminPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const [users, setUsers] = useState([]); // 사용자 데이터를 담을 상태 변수
  const [accidents, setAccidents] = useState([]); // 회원 사고기록
  const [accidentUserId, setAccidentUserId] = useState([]);  //사고가 난 회원들 id
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 정보를 담을 상태 변수
  const [modalOpen, setModalOpen] = useState(false); // 모달 창이 열려있는지를 나타내는 상태 변수


  // 회원 리스트 렌더링
  useEffect(() => {
    console.log("showList rendering");
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

    // 회원 사고리스트
    const fetchAccidentList = async () => {
      await axios.post('/user/updateAccidentStatus')
        .then((res) => {
          // [ { member_id: '12345' }, { member_id: 'q1q2' } ] 포맷
          if (res.data.result === "success") {
            setAccidentUserId((res.data.rows).map(user => user.member_id));
            console.log(accidentUserId);
          }
        })
        .catch((err) => {
          console.log("fetchAccidentList", err);
        })
    }

    // initial rendering.
    fetchUsers();
    fetchAccidentList();

    //5초마다 사고리스트 업데이트
    const interval = setInterval(fetchAccidentList, 5000);
    return () => clearInterval(interval);

  }, []);


  // 모달을 열고 선택된 사용자 정보를 설정
  const openModal = async (user) => {
    setSelectedUser(user);

    //사고 정보 불러오기
    await axios.post('/user/showAccident', { userId: user.member_id })
      .then((res) => {
        if (res.data.result === "success") {
          setAccidents(res.data.rows);
          console.log(accidents);
        }
        else {
          setAccidents([]);
          console.log("사고이력 없음.");
        }
      })
      .catch((error) => {
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
    navigate(`/changeui`, { state: { data: selectedUser, from: "admin" } });
  };

  // 로그아웃 처리
  const logout = async () => {
    await axios.post('user/handleLogout')
      .then((res) => {
        if (res.data.result === 'success') {
          alert("로그아웃됨");
          navigate('/home');
        }
      });
  };

  return (
    <div className={"admin-container"}>
      <h1 className={"admin-title"}>관리자 UI</h1>
      <div className={"admin-area-btn"}>
        <button className={"admin-btn-main"} onClick={() => navigate('/home')} >메인화면</button>
        <button className={"admin-btn-logout"} onClick={() => logout()}>로그아웃</button>
      </div>

      <div className={"admin-area-list"}>
        {users.map((user) => (

          <div key={user.member_id} onClick={() => openModal(user)}
            className={"admin-list-item"}
            style={{backgroundColor: (accidentUserId.includes(user.member_id)) ? "red" : "lightgreen"}}>
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

            {/* 오른족 : 사고 이력 */}
            <div className="admin-modal-right" >
              <h2>사고 이력</h2>
              <ul>
                {accidents.map((accident, index) => (
                  <li key={index} className={`${accident.acc_status==="Y" ? 'admin-modal-item-hl' : ''}` }>
                    <div style={{display:"flex"}}>
                      <div style={{width:"400px"}}>
                        <p>발생 시간: {new Date(accident.acc_time).toLocaleString()}</p>
                        <p>사고 정보: {accident.acc_info}</p>
                      </div>
                      <div  style={{flex:"1"}}>
                        <button >✔</button>
                      </div>
                    </div>

                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
