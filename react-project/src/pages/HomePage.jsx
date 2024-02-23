import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../mideo/siout.png'; // 이미지를 임포트합니다.
import video from '../mideo/video.mp4';

function HomePage() {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}> {/* 이미지와 로그인 버튼이 함께 스크롤에 따라 이동하도록 부모 컨테이너에 position: fixed 적용 */}
      <div style={{ position: 'relative', maxWidth: '100%', margin: '0 auto', paddingBottom: '20px' }}> {/* 이미지와 비디오 컨테이너에 position: relative 추가 */}
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

        <div style={{backgroundColor: 'blue', height:'100px'}}>
          하단배너
        </div>
    
        {/* 로그인 버튼을 우측 상단으로 이동 */}
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 999 }}> {/* position: fixed를 사용하여 화면을 스크롤해도 고정됩니다. */}
          <button onClick={goToLoginPage} style={{ padding: '20px 55px', fontSize: '16px' }}>로그인</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
