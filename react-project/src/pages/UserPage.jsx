import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { UserContext } from '../contexts/UserContext';

// 삼성 갤럭시 알람 형식으로 시간을 변환하는 함수
const convertToGalaxyAlarmFormat = (time) => {
  // 시간 변환 로직을 구현하세요
};

const UserPage = () => {
  const navigate = useNavigate();
  const [sleepTime, setSleepTime] = useState(8);
  const [sleepLightening, setSleepLightening] = useState(50);
  const [userAccidents, setUserAccidents] = useState([]);
  const [isEditing, setIsEditing] = useState({ editing: false, acc_idx: "" });
  const editInfoRef = useRef(null);
  const { isLoggedin, loginData } = useContext(UserContext); 


  const fetchAccidents = async () => {
          try {
            const response = await axios.post('/user/showAccident', { userId: loginData.member_id });
            if (response.data.result === "success") {
              setUserAccidents(response.data.rows);
            } else {
              setUserAccidents([]);
              console.log("사고이력 없음.");
            }
          } catch (error) {
            console.log(error);
          }
        };

  
  // useEffect(() => {
  //   console.log("isLoggedin", isLoggedin);
  //   if (!isLoggedin) {
  //     alert("로그인해주세요");
  //     navigate('/');
  //   } else {

      //     fetchAccidents();
      //   }
      // }, [isLoggedin, navigate, loginData.member_id]);


  const goToChartPage = () => {
    navigate('/chart');
  };

  const goToChangeUiPage = () => {
    navigate('/changeui', { state: { data: loginData, from: "user" } });
  };

  const saveSettings = () => {
    console.log('Settings saved!');
  };

  const updateAccInfo = (accident) => {
    // 사고 정보 업데이트 로직을 구현하세요
  };

  const updateAccident = (accident) => {
    // 사고 상태 업데이트 로직을 구현하세요
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', height: '100vh', width:"100%",  padding: '20px', position: 'relative' }}>
      {/* 왼쪽 : 회원 정보창 */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '33%', alignItems: 'center', marginBottom: '20px' }}>
        <h1>{loginData.member_id}님의 정보</h1>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>이름: {loginData.member_name}</p>
          <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>보호자 이름: {loginData.guardian_name}</p>
          <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>수면 시간: {convertToGalaxyAlarmFormat(`${sleepTime}:00`)} 시간</p>
          <input type="range" min="4" max="12" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} style={{ width: '80%', marginBottom: '20px' }} />
          <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>조명 밝기: {sleepLightening}%</p>
          <input type="range" min="0" max="100" value={sleepLightening} onChange={(e) => setSleepLightening(e.target.value)} style={{ width: '80%' }} />
          <button onClick={saveSettings} style={{ fontSize: '1em', marginTop: '20px' }}>설정 저장</button>
        <button onClick={goToChangeUiPage} style={{ fontSize: '1em', marginBottom: '10px' }}>회원정보 변경</button>
        </div>
      </div>
  
      {/* 중앙 : 사고 이력 */}
      <div style={{ width: '33%', marginLeft: '20px' }}> {/* 좌측 정보창과 간격을 두기 위해 marginLeft 추가 */}
        <h1>사고 이력</h1>
        <ul>
          {userAccidents.map((accident, index) => (
            <li key={index} className={`${accident.acc_status === "Y" ? 'admin-modal-item-hl' : ''}`} style={{ marginBottom: '20px' }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "350px", marginRight: '20px' }}>
                  <p>발생 시간: {new Date(accident.acc_time).toLocaleString()}</p>
                  <p>사고 정보: {accident.acc_info}</p>
                </div>
                <div>
                  {isEditing.editing && (isEditing.acc_idx === accident.acc_idx) ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type='text'
                        defaultValue={accident.acc_info}
                        ref={editInfoRef}
                      />
                      <span className="admin-modal-btn-edit" onClick={() => { updateAccInfo(accident) }}>✔</span>
                      <span className="admin-modal-btn-edit" onClick={() => { setIsEditing({ editing: false, acc_idx: "" }) }}>✖</span>
                    </div>
                  ) : (
                      <span className="admin-modal-btn-edit" onClick={() => { setIsEditing({ editing: true, acc_idx: accident.acc_idx }) }}>🖊</span>
                    )}
                  {accident.acc_status === "Y" &&
                    (<button className="admin-modal-btn-edit" onClick={() => { updateAccident(accident) }}>해결</button>)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
  
      {/* 오른쪽 : 차트 */}
      <div style={{ width: '33%', flex: "1" }}>
        <h1>차트</h1>
        {/* 차트를 표시하는 코드 */}
      </div>
    </div>
  );
};

export default UserPage;
