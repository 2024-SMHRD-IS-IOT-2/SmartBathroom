import React, { useState, useEffect } from 'react'; // useEffect를 import합니다.
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
    navigate('/changeui');
  };

  const logout = () => {
    alert('로그아웃 하였습니다.');
    navigate('/home');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
        <button onClick={goToChartPage} style={{ fontSize: '1em', marginRight: '10px' }}>Chart</button>
        <button onClick={goToChangeUiPage} style={{ fontSize: '1em', marginRight: '10px' }}>회원정보 변경</button>
        <button onClick={logout} style={{ fontSize: '1em' }}>Logout</button>
      </div>
      <h1>{sessionData.username}님의 정보</h1>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>이름: {sessionData.name}</p>
        <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>보호자 이름: {sessionData.guardianName}</p>
        <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>수면 시간: {sleepTime} 시간</p>
        <input type="range" min="4" max="12" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} style={{ width: '80%', marginBottom: '20px' }} />
        <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>조명 밝기: {sleepLightening}%</p>
        <input type="range" min="0" max="100" value={sleepLightening} onChange={(e) => setSleepLightening(e.target.value)} style={{ width: '80%' }} />
      </div>
    </div>
  );
};

export default UserPage;
