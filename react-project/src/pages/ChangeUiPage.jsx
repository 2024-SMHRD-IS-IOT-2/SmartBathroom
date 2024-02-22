import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';

const ChangeUiPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target; // 이벤트가 발생한 요소에서 name과 value를 추출합니다.
    setUserInfo({ ...userInfo, [name]: value }); // 기존 상태에 변경사항을 반영하여 새로운 상태를 설정합니다.
  };
  

  const [userInfo, setUserInfo] = useState({
    userId: '',
    userDate: '',
    userName: '',
    userPw: '',
    userNumber: '',
    addr: '',
    height: '',
    weight: '',
    guardianName: '',
    guardianNumber: '',
  });

  useEffect(() => {
    // 즉시 실행 함수 패턴을 사용하여 비동기 로직 처리
    (async () => {
      try {
        const res = await axios.get('/user/getSession');
        setUserInfo({ ...userInfo, ...res.data }); // 상태 업데이트
      } catch (e) {
        console.error("Error fetching session data:", e);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/user/handleModify`, userInfo);
      if (response.data.result === "success") {
        alert('회원 정보가 성공적으로 수정되었습니다.');
        navigate('/user');
      } else {
        alert('회원 정보 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('회원 정보 수정 중 오류가 발생했습니다.');
    }
  };
  return (
    <div className="change-ui-page">
      <h1>회원정보 수정</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">아이디</label>
          <input type="text" id="userId" name="userId" value={userInfo.userId || ''} readOnly />
        </div>
        <div>
          <label htmlFor="userDate">생년월일</label>
          <input type="text" id="userDate" name="userDate" value={userInfo.userDate || ''} readOnly />
        </div>
        <div>
          <label htmlFor="userName">이름</label>
          <input type="text" id="userName" name="userName" value={userInfo.userName || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="userPw">비밀번호</label>
          <input type="password" id="userPw" name="userPw" value={userInfo.userPw || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="userNumber">전화번호</label>
          <input type="text" id="userNumber" name="userNumber" value={userInfo.userNumber || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="addr">주소</label>
          <input type="text" id="addr" name="addr" value={userInfo.addr || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="height">키</label>
          <input type="text" id="height" name="height" value={userInfo.height || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="weight">몸무게</label>
          <input type="text" id="weight" name="weight" value={userInfo.weight || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="guardianName">보호자 이름</label>
          <input type="text" id="guardianName" name="guardianName" value={userInfo.guardianName || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="guardianNumber">보호자 번호</label>
          <input type="text" id="guardianNumber" name="guardianNumber" value={userInfo.guardianNumber || ''} onChange={handleChange} />
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default ChangeUiPage;