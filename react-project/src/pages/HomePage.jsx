import React from 'react';
import img from '../media/siout.png'; // 이미지를 임포트합니다.
import video from '../media/video.mp4';

function HomePage() {



  return (
      <div style={{ position: 'relative', maxWidth: '100%', margin: '0 auto', paddingBottom: '20px' }}>
        {/* 이미지 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', maxWidth: '1200px', margin: '0 auto' }}>
          <img
            src={img} 
            alt=""
            style={{ width: '20%', height: 'auto' }} // 이미지 크기 조정
          />
          <div style={{ marginLeft: '20px' }}>
            <h1>이미지를 눌러 제품 정보를 확인하세요!</h1>
            <p>더 많은 정보를 원하시면 클릭해주세요.</p>
          </div>
        </div> 
    
        {/* 시연 영상 */}
        <video
          src={video}
          controls
          style={{ width: '100%', height: 'auto' }} // 비디오 크기 조정
        />

      </div>
  );
}

export default HomePage;
