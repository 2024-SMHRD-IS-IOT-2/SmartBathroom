import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Charts from "../components/Chart";
import AccList from "../components/AccList";
import axios from '../axios';
import AlertComponent from "../components/AlertComponent";


const UserPage = () => {
  const [sleepTime, setSleepTime] = useState("22:00-9:00"); // 초기값을 빈 문자열로 설정합니다.
  const [sleepLightening, setSleepLightening] = useState(50); // 초기값을 0으로 설정합니다.
  const navigate = useNavigate();
  const { isLoggedin, loginData } = useContext(UserContext);
  console.log(loginData.sleep_lightening);
  const [sleepStartTime, setSleepStartTime] = useState("");
  const [sleepEndTime, setSleepEndTime] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // 알림 메시지
  const [alertKey, setAlertKey] = useState(0);



  useEffect(() => {
    if (!isLoggedin) {
      alert("로그인해주세요");
      navigate("/");
    } else {
      // loginData가 정의되어 있고, sleep_time이 유효한지 확인합니다.
      if (loginData && loginData.sleep_time) {
        const times = loginData.sleep_time.split('-');
        if (times.length === 2) {
          setSleepStartTime(times[0]);
          setSleepEndTime(times[1]);
          setSleepTime(loginData.sleep_time); // 여기서 sleepTime을 업데이트 합니다.
        }
      }
      // sleep_lightening이 유효한지 확인합니다.
      if (loginData && loginData.sleep_lightening) {
        setSleepLightening(loginData.sleep_lightening);
      }
    }
  }, [isLoggedin, loginData, navigate]);



  const saveSettings = async () => {
    const updatedSettings = {
      sleepTime: sleepTime,
      sleepLightening: sleepLightening,
      userId: loginData.member_id,
    };
    console.log("Updated Settings:", updatedSettings);
    await axios.post('/user/handleSleep', updatedSettings)
      .then((res) => {
        console.log(res.data);
        setAlertMessage('설정이 저장되었습니다.'); // 알림 메시지 설정
        setAlertKey(prevKey => prevKey + 1); // 여기로 이동
      })
      .catch((error) => {
        console.error("설정 저장 중 오류 발생:", error);
        setAlertMessage("오류가 발생했습니다."); // 오류 메시지
        setAlertKey(prevKey => prevKey + 1); // 오류 발생 시에도 키를 업데이트할 수 있습니다.
      });
  };


  const goToChangeUiPage = () => {
    navigate("/changeui", { state: { data: loginData, from: "user" } });
  };



  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        height: "100vh",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* 왼쪽 : 회원 정보창 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20%",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>{loginData.member_id}님의 정보</h1>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>이름: {loginData.member_name}</p>
          <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>보호자 이름: {loginData.guardian_name}</p>
          <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>취침시간</p>
          <input
            type="time"
            defaultValue={sleepStartTime}
            onChange={(e) => {
              setSleepStartTime(e.target.value);
              // 시작 시간을 업데이트하고, 전체 sleep_time 상태도 함께 업데이트합니다.
              setSleepTime(`${e.target.value}-${sleepEndTime}`);
            }}
            style={{ width: '80%', marginBottom: '20px' }}
          />
          {/* <input type="time" value={loginData.sleep_time.sliece(0, 4)} onChange={(e) => setSleepTime(e.target.value)} style={{ width: '80%', marginBottom: '20px' }} /> */}
          <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>기상시간</p>

          <input
            type="time"
            defaultValue={sleepEndTime}
            onChange={(e) => {
              setSleepEndTime(e.target.value);
              // 끝 시간을 업데이트하고, 전체 sleep_time 상태도 함께 업데이트합니다.
              setSleepTime(`${sleepStartTime}-${e.target.value}`);
            }}
            style={{ width: '80%', marginBottom: '20px' }}
          />
          {/* <input type="time" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} style={{ width: '80%', marginBottom: '20px' }} /> */}
          <p style={{ fontSize: '1.5em', marginBottom: '10px' }}>조명 밝기: {sleepLightening}%</p>
          <input type="range" min="0" max="100" value={sleepLightening} onChange={(e) => setSleepLightening(e.target.value)} style={{ width: '80%', marginBottom: '20px' }} />
          <button onClick={saveSettings} style={{ fontSize: '1em' }}>설정 저장</button>
          <button onClick={goToChangeUiPage} style={{ fontSize: '1em', marginBottom: '10px' }}>회원정보 변경</button>
        </div>
        <AlertComponent message={alertMessage} duration={3000} key={alertKey} backgroundColor="#fff129e8" />



      </div>

      {/* 중앙 : 사고 이력창 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20%",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <AccList member_id={loginData.member_id} />
      </div>

      {/* 오른쪽 : 차트 보기 버튼 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          alignItems: "center",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        <h1>차트(그래프)</h1>

        <Charts />
      </div>
    </div>
  );
};

export default UserPage;
