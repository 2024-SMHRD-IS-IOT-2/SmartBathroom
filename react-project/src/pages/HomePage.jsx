import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from './siout.png'; // 이미지를 임포트합니다.

function HomePage() {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto', paddingBottom: '20px' }}> {/* 하단 여백 추가 */}
      {/* 이미지 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', maxWidth: '1200px', margin: '0 auto' }}>
        <img
          src={img} 
          alt=""
          style={{ width: '20%', height: 'auto' }} // 이미지 크기를 조정합니다.
        />
        <div style={{ marginLeft: '20px' }}>
          <h1>이미지를 눌러 제품 정보를 확인하세요!</h1>
          <p>더 많은 정보를 원하시면 클릭해주세요.</p>
        </div>
      </div>

      {/* 시연 영상 */}
      <iframe
        width="100%"
        height="500"
        src="https://www.youtube.com/embed/VIDEO_ID" // 영상 링크 -추가로 수정해야함
        title="시연 영상"
        frameborder="0"
        allowfullscreen
        style={{ maxWidth: '100%', marginTop: '20px' }} // 화면 크기에 따라 영상 크기 조정 
      ></iframe>

      {/* 로그인 버튼을 우측 상단으로 이동 */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button onClick={goToLoginPage} style={{ padding: '20px 55px', fontSize: '16px' }}>로그인</button>
      </div>
    </div>
  );
}

export default HomePage;
