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
import React from 'react';
import img from '../media/siot.png'; // 이미지를 임포트합니다.

function HomePage() {
  const youtubeVideoId = 'UpRdaWgw4EQ'; // 유튜브 영상 ID를 입력하세요.

  return (
    <div style={{ position: 'relative', maxWidth: '100%', margin: '0 auto', paddingBottom: '20px' }}>
      {/* 시연 영상 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80vh', position: 'relative', marginTop: '20px' }}>
        <img
          src={img} 
          alt=""
          style={{ position: 'absolute', top: '10px', right: '10px', width: '15%', height: 'auto', opacity: '0.5' }} // 이미지 위치 및 크기 조정
        />
        <iframe
          width="80%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default HomePage;
