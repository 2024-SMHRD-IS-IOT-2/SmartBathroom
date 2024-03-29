import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅을 사용합니다.
import axios from '../axios'; // axios를 임포트합니다.
import { UserContext } from '../contexts/UserContext';
import BottomText from '../components/BottomText';

const LoginPage = () => {
  const [userId, setUserId] = useState(''); // 아이디 상태
  const [userPw, setUserPw] = useState(''); // 비밀번호 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const { setIsLoggedin, setLoginData } = useContext(UserContext);
  const [loginError, setLoginError] = useState('');

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    if (userId.trim() === '' || userPw.trim() === '') {
      // 아이디나 비밀번호가 비어있는 경우
      setLoginError('아이디와 비밀번호를 모두 입력해주세요.');
    } else {
      try {
        // 로그인 요청을 보냅니다.
        await axios.post('/user/handleLogin', { userId, userPw })
          .then((res) => {
            if (res.data.result === "success") {
              // 로그인에 성공했을 때
              setLoginData(res.data.data);
              setIsLoggedin(true);
              navigate('/user'); // 유저 페이지로 이동

            } else if (res.data.result === "admin") {
              alert('관리자 로그인에 성공했습니다.');
              setLoginData(res.data.data);
              setIsLoggedin(true);
              navigate('/admin'); // 유저 페이지로 이동
            }
            else {
              // 로그인 실패
              setLoginError("아이디 또는 비밀번호를 확인해주세요.");
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p className='gohome-logo' onClick={() => navigate('/')}>SIoT</p>
      <form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="userId">아이디</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)} // 아이디 입력 상태 업데이트
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="userPw">비밀번호</label>
          <input
            type="password"
            id="userPw"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)} // 비밀번호 입력 상태 업데이트
          />
        </div>
        <div style={{ color: 'red', marginBottom: '10px' }}>{loginError}</div>
        <button type="submit" style={{ marginBottom: '10px' }}>로그인</button>
        <button onClick={() => navigate('/join')} style={{ marginBottom: '10px' }}>회원가입</button> {/* 회원가입 페이지로 이동 */}
      </form>
      <BottomText />
    </div>
  );
  
};

export default LoginPage;
