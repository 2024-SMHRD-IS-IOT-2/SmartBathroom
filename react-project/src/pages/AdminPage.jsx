import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅 사용
import axios from '../axios';
import imgCheck from '../media/check.png';


const AdminPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const [users, setUsers] = useState([]); // 사용자 데이터를 담을 상태 변수
  const [userAccidents, setUserAccidents] = useState([]); // 회원 사고기록
  const [accidentUserId, setAccidentUserId] = useState([]);  //사고가 난 회원들 id
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 정보를 담을 상태 변수
  const [modalOpen, setModalOpen] = useState(false); // 모달 창이 열려있는지를 나타내는 상태 변수
  const [isEditing, setIsEditing] = useState({ editing: false, acc_idx: "" }); // info 텍스트 필드 수정여부
  // const [editedInfo, setEditedInfo] = useState(""); // info 수정텍스트
  
  const editInfoRef = useRef(); // info 텍스트 ref

  // 회원 리스트 렌더링
  // 회원 사고 리스트 5초마다 렌더링. 타이머 사용
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
          setUserAccidents(res.data.rows);

        }
        else {
          setUserAccidents([]);
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

  // 사고 처리 완료버튼.
  const updateAccident = (item) => {

    //업데이트할 사고 아이템
    const updatedAccident = { ...item, acc_status: 'N'};

    // 사고아이템 stata 업데이트
    setUserAccidents(curList =>
      curList.map(accident =>
        accident.acc_idx === item.acc_idx ? updatedAccident : accident
      )
    );

    //사고아이템 db업데이트
        updateAccDb(updatedAccident);

  }

  // 수정확인 버튼.
  const updateAccInfo = async (item) => {

    const updatedAccident = { ...item, acc_info: editInfoRef.current.value };

    // 사고아이템 stata 업데이트
    setUserAccidents(curList =>
      curList.map(accident =>
        accident.acc_idx === item.acc_idx ? updatedAccident : accident
      )
    );

    //수정 종료
    setIsEditing({ editing:false, acc_idx: item.acc_idx });

    updateAccDb(updatedAccident);

  };

  //사고아이템 db업데이트
  const updateAccDb = async (item)=>{
      await axios.post('/user/updateAccident', item)
      .then((res) => {
        if (res.data.result === "success") {
          console.log("업데이트 완료");
        }
      })
      .catch((err) => {
        console.log("에러", err);
      })
  }


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

            {/* 오른족 : 사고 이력 */}
            <div className="admin-modal-right" >
              <h2>사고 이력</h2>
              <ul>
                {userAccidents.map((accident, index) => (
                  <li key={index} className={`${accident.acc_status === "Y" ? 'admin-modal-item-hl' : ''}`}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "350px" }}>
                        <p>발생 시간: {new Date(accident.acc_time).toLocaleString()}</p>

                        <div style={{display:"flex", justifyContent: "space-between"}}>
                          {isEditing.editing && (isEditing.acc_idx === accident.acc_idx) ?
                            (
                              <input
                                type='text'
                                defaultValue={accident.acc_info}
                                ref={editInfoRef}
                                
                              />
                            ) : 
                            (<p>사고 정보: {accident.acc_info}</p>)}


                          {isEditing.editing && (isEditing.acc_idx === accident.acc_idx) ?
                          (
                            <div style={{display:"flex", alignItems: "center"}}>
                              <span className="admin-modal-btn-edit" onClick={()=>{updateAccInfo(accident)}}>✔</span>
                              <span className="admin-modal-btn-edit" onClick={() => { setIsEditing({ editing: false, acc_idx: "" }) }}>✖</span>
                            </div>
                          ):
                          (<span className="admin-modal-btn-edit" onClick={() => { setIsEditing({ editing: true, acc_idx: accident.acc_idx }) }}>🖊</span>)}

                        </div>

                      </div>
                      <div style={{ flex: "1" }}>
                        {accident.acc_status === "Y" && 
                        (<img src={imgCheck} style={{width:"30px", height:"30px"}} onClick={updateAccident} alt='해결' />)}
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
