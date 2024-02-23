import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅을 사용합니다.
import axios from '../axios'; // axios를 임포트합니다.

const LoginPage = () => {
  const [userId, setUserId] = useState(''); // 아이디 상태
  const [userPw, setUserPw] = useState(''); // 비밀번호 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    if (userId.trim() === '' || userPw.trim() === '') {
      // 아이디나 비밀번호가 비어있는 경우
      alert('아이디와 비밀번호를 모두 입력해주세요.');
    } else {
      try {
        // 로그인 요청을 보냅니다.
        await axios.post('/user/handleLogin', { userId, userPw })
        .then((res)=>{
            if (res.data.result === "success"){
              // 로그인에 성공했을 때
              alert('회원 로그인에 성공했습니다.');
              navigate('/user'); // 유저 페이지로 이동

            } else if (res.data.result === "admin") {
              alert('관리자 로그인에 성공했습니다.');
              navigate('/admin'); // 유저 페이지로 이동
            }
            else {
              // 로그인 실패
              alert("로그인에 실패했습니다. 다시 시도해주세요");
            }
          }
        );

      } catch (error) {
        console.log("error", error);
        // 일반적인 오류 메시지를 표시합니다.
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        
      }
    }
  };


  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">아이디:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)} // 아이디 입력 상태 업데이트
          />
        </div>
        <div>
          <label htmlFor="userPw">비밀번호:</label>
          <input
            type="password"
            id="userPw"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)} // 비밀번호 입력 상태 업데이트
          />
        </div>
        <button type="submit">Login</button>
      <button onClick={() => navigate('/join')}>Sign</button> {/* 회원가입 페이지로 이동 */}
      <button onClick={() => navigate('/home')}>Home</button> {/* 홈 페이지로 이동 */}
      </form>
    </div>
  );
};

export default LoginPage;
