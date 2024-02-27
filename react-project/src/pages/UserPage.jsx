import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Charts from "../components/Chart";
import AccList from "../components/AccList";
import axios from '../axios';


const UserPage = () => {
  const navigate = useNavigate();
  const [sleepTime, setSleepTime] = useState("23:00-06:00");
  const [sleepLightening, setSleepLightening] = useState(50);
  const { isLoggedin, loginData } = useContext(UserContext);
  console.log(loginData.sleep_lightening);
  const [sleepStartTime, setSleepStartTime] = useState("");
  const [sleepEndTime, setSleepEndTime] = useState("");
  const [showAlert, setShowAlert] = useState(false); // 알림 상태
  const [alertMessage, setAlertMessage] = useState(""); // 알림 메시지



  useEffect(() => {
    console.log("isLoggedin", isLoggedin);
    if (!isLoggedin) {
      alert("로그인해주세요");
      navigate("/");
    } else {

      setSleepStartTime(loginData.sleep_time.split('-')[0]);
      setSleepEndTime(loginData.sleep_time.split('-')[1]);
      console.log("sleeptime", sleepStartTime, sleepEndTime);
      setSleepTime(loginData.sleepTime);
      setSleepLightening(loginData.sleep_lightening);
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
        setShowAlert(true); // 알림 상태를 true로 설정하여 알림을 띄움
        setAlertMessage("설정이 저장되었습니다."); // 알림 메시지 설정
        setTimeout(() => setShowAlert(false), 3000); // 3초 후 알림 사라짐
      })
      .catch((error) => {
        console.error("설정 저장 중 오류 발생:", error);
        setShowAlert(true); // 에러 시에도 알림 띄우기
        setAlertMessage("오류가 발생했습니다."); // 오류 메시지
        setTimeout(() => setShowAlert(false), 3000); // 3초 후 알림 사라짐
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
        {showAlert && (
          <div style={{ position: 'fixed', top:'30%', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ebe943cf', padding: '20px 40px', borderRadius: '10px', zIndex: 1000, fontSize:'25px'}}>
            {alertMessage}
          </div>
        )}
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
        <AccList member_id={loginData.member_id}/>
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
