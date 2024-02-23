import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const UserPage = () => {
  const navigate = useNavigate();
  const [sleepTime, setSleepTime] = useState(8);
  const [sleepLightening, setSleepLightening] = useState(50);
  const [sessionData, setSessionData] = useState({}); // session 데이터 상태

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get('/user/getSession');
        setSessionData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    fetchSessionData();
  }, []);

  const goToChartPage = () => {
    navigate('/chart');
  };

  const goToChangeUiPage = () => {
    navigate('/changeui', {state : sessionData});
  };

  const logout = async () => {
    await axios.post('user/handleLogout')
    .then ((res)=>{
      if (res.data.result === 'success'){
        alert("로그아웃됨");
        navigate('/home');
      }
    });
  };

  const saveSettings = () => {
    // 여기에 설정을 저장하는 로직을 추가하세요.
    console.log('Settings saved!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', padding: '20px', position: 'relative' }}>
      <div style={{ position: 'fixed', top: '10px', right: '20px', zIndex: '999' }}>
        <button onClick={goToChartPage} style={{ fontSize: '1em', marginRight: '10px' }}>차트</button>
        <button onClick={goToChangeUiPage} style={{ fontSize: '1em', marginRight: '10px' }}>회원정보 변경</button>
        <button onClick={logout} style={{ fontSize: '1em' }}>로그아웃</button>
      </div>
      <h1>{sessionData.member_id}님의 정보</h1>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>이름:{sessionData.member_name}</p>
        <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>보호자 이름: {sessionData.guardian_name}</p>
        <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>수면 시간: {sleepTime.sleep_time} 시간</p>
        <input type="range" min="4" max="12" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} style={{ width: '80%', marginBottom: '20px' }} />
        <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>조명 밝기: {sleepLightening.sleep_lightening}%</p>
        <input type="range" min="0" max="100" value={sleepLightening} onChange={(e) => setSleepLightening(e.target.value)} style={{ width: '80%' }} />
        <button onClick={saveSettings} style={{ fontSize: '1em', marginTop: '20px' }}>설정 저장</button>
      </div>
      <div style={{ width: '20%', marginTop: '20px', backgroundColor: '#f0f0f0' }}>
        {/* 여기에 차트를 표시하는 컴포넌트를 추가 */}
        {<p>차트를 표시하는 공간</p>}
      </div>
    </div>
  );
};

export default UserPage;
