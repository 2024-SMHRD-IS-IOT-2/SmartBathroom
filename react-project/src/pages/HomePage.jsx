import React from "react";
import img from "../media/siot.png"; // 이미지를 임포트합니다.

function HomePage() {
  const youtubeVideoId = "4KaABeCAWEE"; // 유튜브 영상 ID를 입력하세요.

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        maxWidth: "100%",
        margin: "0 auto",
        paddingBottom: "20px",
      }}
    >
      {/* 영상 및 작업자 정보 카드 */}
      <div style={{ width: "70%" }}>
        <div
          style={{ position: "relative", maxWidth: "100%", margin: "0 auto" }}
        >
          <iframe
            width="100%"
            height="650vh"
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div style={{ paddingLeft: "30px", marginTop: "20px", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "20px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "#f8f8f8",
                padding: "10px",
                marginBottom: "10px",
                overflow: "hidden",
                marginRight: "20px",
                flex: "1",
                textAlign:"center"
              }}
            >
              
              <h1>김성재(팀장)</h1>
              <h3>역할:<br></br>PM,Arduino</h3>
            </div>
            <div
              style={{
                backgroundColor: "#f8f8f8",
                padding: "10px",
                marginBottom: "10px",
                overflow: "hidden",
                marginRight: "20px",
                flex: "1",
                textAlign:"center"
              }}
            >
            
              <h1>최교인</h1>
              <h3>역할:<br></br>DB,백엔드</h3>
            </div>
            <div
              style={{
                backgroundColor: "#f8f8f8",
                padding: "10px",
                marginBottom: "10px",
                overflow: "hidden",
                marginRight: "20px",
                flex: "1",
                textAlign:"center"
              }}
            >
              
              <h1>하승철</h1>
              <h3>역할:<br></br>프론트,백엔드</h3>
            </div>
            <div
              style={{
                backgroundColor: "#f8f8f8",
                padding: "10px",
                overflow: "hidden",
                flex: "1",
                textAlign:"center"
              }}
            >
             
              <h1>임용묵</h1>
              <h3>역할:<br></br>프론트,백엔드</h3>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "30%", paddingLeft: "30px", fontSize: "16px", lineHeight: "1.6" }}>
  <div style={{ marginBottom: "20px" }}>
    <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>제품 소개 및 기능</h1>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      <li style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>환풍기</h2>
        <p>화장실 내의 암모니아, 메탄, 온도, 습도를 실시간으로 감지합니다. 이러한 요소들이 일정 수준을 초과하면 자동으로 환풍기를 작동시켜 실내 공기를 교환하고, 환경의 전반적인 안전성을 향상시킵니다.</p>
      </li>
      <li style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>출입감지</h2>
        <p>문이나 창문 등의 개폐 상태를 감지하여 출입을 모니터링합니다. 누군가 화장실을 사용하거나 떠났을 때, 이 기능은 그 정보를 사용자에게 알려줍니다.</p>
      </li>
      <li style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>사고감지</h2>
        <p>화장실 내에서 발생할 수 있는 낙상 사고를 감지하고 즉시 알립니다. 이는 특히 노약자나 독거노인 등이 화장실을 사용할 때 중요한 안전 기능입니다. 긴급 상황 시에 즉시 조치를 취할 수 있도록 도와줍니다. 버튼을 누르면 사전에 설정된 연락처 </p>
          <p>(예: 가족, 친구, 응급 서비스 등)로 알림이 전송됩니다.</p>
      </li>
    </ul>
  </div>
</div>

      {/* 워터마크 */}
      <img
        src={img}
        alt=""
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          width: "15%",
          height: "auto",
          opacity: "0.5",
        }} // 이미지 위치 및 크기 조정
      />
    </div>
  );
}

export default HomePage;
