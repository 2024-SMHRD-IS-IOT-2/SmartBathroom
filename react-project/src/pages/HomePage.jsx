// 미디어에 영상 저장하여 경로를 따와 영상 띄우는코드

// import React from 'react';
// import img from '../media/siout.png'; // 이미지를 임포트합니다.
// import video from '../media/video.mp4';

// function HomePage() {

//   return (
//       <div style={{ position: 'relative', maxWidth: '100%', margin: '0 auto', paddingBottom: '20px' }}>
//         {/* 이미지 */}
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', maxWidth: '1200px', margin: '0 auto' }}>
//           <img
//             src={img}
//             alt=""
//             style={{ width: '20%', height: 'auto' }} // 이미지 크기 조정
//           />
//           <div style={{ marginLeft: '20px' }}>
//           </div>
//         <h3>이미지를 눌러 제품 정보를 확인하세요!</h3>
//         </div>

//         {/* 시연 영상 */}
//         <video
//           src={video}
//           controls
//           style={{ width: '100%', height: 'auto' }} // 비디오 크기 조정
//           />
//       </div>
//   );
// }

// export default HomePage;

// 기존 영상 경로를 따와 띄우는 코드
import React from "react";
import img from "../media/siot.png"; // 이미지를 임포트합니다.

function HomePage() {
  const youtubeVideoId = "UpRdaWgw4EQ"; // 유튜브 영상 ID를 입력하세요.

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '100%', margin: '0 auto', paddingBottom: '20px' }}>
      {/* 영상 및 작업자 정보 카드 */}
      <div style={{ width: '70%' }}>
        <div style={{ position: 'relative', maxWidth: '100%', margin: '0 auto' }}>
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
        
        <div style={{ paddingLeft: '30px', marginTop: '20px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#f8f8f8', padding: '10px', marginBottom: '10px', overflow: 'hidden', marginRight: '20px', flex: '1' }}>
              <h3>팀장</h3>
              <p>이름: 김성재</p>
              <p>역할: 회초리</p>
              <p>작업 내용: --</p>
            </div>
            <div style={{ backgroundColor: '#f8f8f8', padding: '10px', marginBottom: '10px', overflow: 'hidden', marginRight: '20px', flex: '1' }}>
              <h3>팀원</h3>
              <p>이름: 최교인</p>
              <p>역할: 노예1</p>
              <p>작업 내용: --</p>
            </div>
            <div style={{ backgroundColor: '#f8f8f8', padding: '10px', marginBottom: '10px', overflow: 'hidden', marginRight: '20px', flex: '1' }}>
              <h3>팀원</h3>
              <p>이름: 하승철</p>
              <p>역할: 노예2</p>
              <p>작업 내용: --</p>
            </div>
            <div style={{ backgroundColor: '#f8f8f8', padding: '10px', overflow: 'hidden', flex: '1' }}>
              <h3>팀원</h3>
              <p>이름: 임용묵</p>
              <p>역할: 노예3</p>
              <p>작업 내용: --</p>
            </div>
          </div>
        </div>
      </div>
  
      {/* 제품 소개 기능 */}
      <div style={{ width: '30%', paddingLeft: '30px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2>제품 소개 및 기능</h2>
          <p>여기에 제품 소개 및 기능을 입력</p>
        </div>
      </div>
  
      {/* 워터마크 */}
      <img
        src={img} 
        alt=""
        style={{ position: 'absolute', bottom: '10px', right: '10px', width: '15%', height: 'auto', opacity: '0.5' }} // 이미지 위치 및 크기 조정
      />
    </div>
  );
}


export default HomePage;
