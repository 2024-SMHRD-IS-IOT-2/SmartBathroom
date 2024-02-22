import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useNavigate와 useParams 훅 사용

const ChangeUiPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const { userId } = useParams(); // URL 파라미터에서 userId 추출
  const [name, setName] = useState(''); // 이름 상태
  const [userPw, setuserPw] = useState(''); // 이메일 상태

  // 정보 수정 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    console.log(`UserID: ${userId}, Name: ${name}, userPw: ${userPw}`); // 콘솔에 수정된 사용자 정보 출력
    // 여기서 백엔드로 정보 수정 요청을 보내는 로직을 구현할 수 있습니다.
    navigate('/user'); // 정보 수정 후 사용자 페이지로 이동
  };

  return (
    <div>
      <h1>정보 수정 - 사용자 {userId}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">새로운 이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} // 이름 입력 상태 업데이트
          />
        </div>
        <div>
          <label htmlFor="userPw">새로운 비밀번호:</label>
          <input
            type="password"
            id="userPw"
            value={userPw}
            onChange={(e) => setuserPw(e.target.value)} // 이메일 입력 상태 업데이트
          />
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default ChangeUiPage;
