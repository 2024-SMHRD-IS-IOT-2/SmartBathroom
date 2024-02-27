import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Charts from "../components/Chart";
import AccList from "../components/AccList";

// 시간을 갤럭시 알람 형식으로 변환하는 함수
const convertToGalaxyAlarmFormat = (time) => {
  // 시간 변환 로직 구현
};

const UserPage = () => {
  const navigate = useNavigate();
  const [sleepTime, setSleepTime] = useState(8);
  const [sleepLightening, setSleepLightening] = useState(50);
  const { isLoggedin, loginData } = useContext(UserContext);


  useEffect(() => {
    console.log("isLoggedin", isLoggedin);
    if (!isLoggedin) {
      alert("로그인해주세요");
      navigate("/");
    } else {
      setSleepTime(loginData.sleepTime);
      setSleepLightening(loginData.sleepLightening);
    }
  }, [isLoggedin, navigate]);


  const saveSettings = async () => {
    const updatedSettings = {
      sleepTime: sleepTime,
      sleepLightening: sleepLightening,
      userId: loginData.member_id,
    };
    console.log("Updated Settings:", updatedSettings);
    // 서버에 설정 저장 요청 보내기
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
        <div style={{ textAlign: "center", width: "100%" }}>
          <p style={{ fontSize: "1.5em", marginBottom: "10px" }}>
            이름: {loginData.member_name}
          </p>
          <p style={{ fontSize: "1.5em", marginBottom: "10px" }}>
            보호자 이름: {loginData.guardian_name}
          </p>
          <p style={{ fontSize: "1.5em", marginBottom: "10px" }}>
            수면 시작 시간: {convertToGalaxyAlarmFormat(`${sleepTime}:00`)} 시간
          </p>
          <input
            type="time"
            value={sleepTime}
            onChange={(e) => setSleepTime(e.target.value)}
            style={{ width: "80%", marginBottom: "20px" }}
          />
          <p style={{ fontSize: "1.5em", marginBottom: "10px" }}>
            조명 밝기: {sleepLightening}%
          </p>
          <input
            type="range"
            min="0"
            max="100"
            value={sleepLightening}
            onChange={(e) => setSleepLightening(e.target.value)}
            style={{ width: "80%", marginBottom: "20px" }}
          />
          <button onClick={saveSettings} style={{ fontSize: "1em" }}>
            설정 저장
          </button>
          <button
            onClick={goToChangeUiPage}
            style={{ fontSize: "1em", marginBottom: "10px" }}
          >
            회원정보 변경
          </button>
        </div>
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

      {/* 모달 창 */}
      {/* {isEditing.editing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "80%",
              maxHeight: "80%",
              overflowY: "auto",
            }}
          >
            <h2>사고 정보 수정</h2>
            <label htmlFor="updatedAccidentInfo">사고 정보:</label>
            <textarea
              id="updatedAccidentInfo"
              value={updatedAccidentInfo}
              onChange={handleAccidentInfoChange}
            />
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button onClick={saveUpdatedAccidentInfo}>저장</button>
              <button onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default UserPage;
