<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const navigate = useNavigate();
  const [sleepTime, setSleepTime] = useState(8);
  const [sleepLightening, setsleepLightening] = useState(50);

  // 사용자 데이터
  const currentUser = {
    id: 1,
    username: 'user2',
    name: '김●●',
    guardianName: '김●●의 보호자',
  };
=======
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅 사용
import axios from '../axios';

const UserPage =  () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  
 

  //session 데이터 받아오기
  let sessionData = {};
  useEffect(async ()=>{
    await axios.get('/user/getSession')
    .then((res)=>{
     sessionData = res.data;
     console.log(sessionData);
    })
    .catch((e)=>{
      console.log("error", e);
    })
  },[]);
>>>>>>> 0d96cbc6e0b68eea9936ea36322210fd1c14065e

  const goToChartPage = () => {
    navigate('/chart');
  };

  const goToChangeUiPage = () => {
    navigate('/changeui');
  };

  const logout = () => {
    navigate('/login');
  };




  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
        <button onClick={goToChartPage} style={{ fontSize: '1em', marginRight: '10px' }}>차트</button>
        <button onClick={goToChangeUiPage} style={{ fontSize: '1em', marginRight: '10px' }}>회원정보 변경</button>
        <button onClick={logout} style={{ fontSize: '1em' }}>로그아웃</button>
      </div>
      <h1>{currentUser.username}님의 정보</h1>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>이름: {currentUser.name}</p>
        <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>보호자 이름: {currentUser.guardianName}</p>
        <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>수면 시간: {sleepTime} 시간</p>
        <input type="range" min="4" max="12" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} style={{ width: '80%', marginBottom: '20px' }} />
        <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>조명 밝기: {sleepLightening}%</p>
        <input type="range" min="0" max="100" value={sleepLightening} onChange={(e) => setsleepLightening(e.target.value)} style={{ width: '80%' }} />
      </div>
    </div>
  );
};

export default UserPage;
