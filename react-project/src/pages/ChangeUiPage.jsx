import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';

const ChangeUiPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // URL 파라미터에서 userId 추출

  // 사용자 정보 상태 초기화
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    userPw: '',
    userNumber: '',
    addr: '',
    height: '',
    weight: '',
    guardianName: '',
    guardianNumber: '',
  });

  // 컴포넌트 마운트 시 사용자 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 서버로부터 사용자 정보 요청
        const response = await axios.get(`/user/${userId}`);
        setUserInfo(response.data); // 상태 업데이트
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  // 입력값 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo(prev => ({ ...prev, [id]: value }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 수정된 사용자 정보를 서버로 전송
      const response = await axios.post(`/user/handleModify`, userInfo);
      if (response.data.result === "success") {
        alert('회원 정보가 성공적으로 수정되었습니다.');
        navigate('/user'); // 사용자 정보 페이지로 이동
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
          <label htmlFor="name">아이디</label>
          <input type="text" id="name" value={userInfo.name || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="name">이름</label>
          <input type="text" id="name" value={userInfo.name || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="userPw">비밀번호</label>
          <input type="password" id="userPw" value={userInfo.userPw || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="userNumber">전화번호</label>
          <input type="text" id="userNumber" value={userInfo.userNumber || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="addr">주소</label>
          <input type="text" id="addr" value={userInfo.addr || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="height">키</label>
          <input type="text" id="height" value={userInfo.height || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="weight">몸무게</label>
          <input type="text" id="weight" value={userInfo.weight || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="guardianName">보호자 이름</label>
          <input type="text" id="guardianName" value={userInfo.guardianName || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="guardianNumber">보호자 번호</label>
          <input type="text" id="guardianNumber" value={userInfo.guardianNumber || ''} onChange={handleChange} />
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default ChangeUiPage;
