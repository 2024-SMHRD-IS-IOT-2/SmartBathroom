import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios';

const ChangeUiPage = () => {

const data = useLocation();
console.log(data.state);

  const navigate = useNavigate();

  const userIdRef = useRef();
  const userDateRef = useRef();
  const userNameRef = useRef();
  const userPwRef = useRef();
  const userNumberRef = useRef();
  const addrRef = useRef();
  const heightRef = useRef();
  const weightRef = useRef();
  const guardianNameRef = useRef();
  const guardianNumberRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUserInfo = {
      userId: userIdRef.current.value,
      userDate: userDateRef.current.value,
      userName: userNameRef.current.value,
      userPw: userPwRef.current.value,
      userNumber: userNumberRef.current.value,
      addr: addrRef.current.value,
      height: heightRef.current.value,
      weight: weightRef.current.value,
      guardianName: guardianNameRef.current.value,
      guardianNumber: guardianNumberRef.current.value,
    };

    try {
      const response = await axios.post('/user/handleModify', updatedUserInfo);
      if (response.data.result === "success") {
        alert('회원 정보가 성공적으로 수정되었습니다.');
        navigate('/user'); // 수정 성공 후 사용자를 다른 페이지로 리디렉션
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
          <input type="text" id="userId" name="userId" ref={userIdRef}  />
        </div>
        <div>
          <label htmlFor="userDate">생년월일</label>
          <input type="text" id="userDate" name="userDate" ref={userDateRef}  />
        </div>
        <div>
          <label htmlFor="userName">이름</label>
          <input type="text" id="userName" name="userName" ref={userNameRef} />
        </div>
        <div>
          <label htmlFor="userPw">비밀번호</label>
          <input type="password" id="userPw" name="userPw" ref={userPwRef} />
        </div>
        <div>
          <label htmlFor="userNumber">전화번호</label>
          <input type="text" id="userNumber" name="userNumber" ref={userNumberRef} />
        </div>
        <div>
          <label htmlFor="addr">주소</label>
          <input type="text" id="addr" name="addr" ref={addrRef} />
        </div>
        <div>
          <label htmlFor="height">키</label>
          <input type="text" id="height" name="height" ref={heightRef} />
        </div>
        <div>
          <label htmlFor="weight">몸무게</label>
          <input type="text" id="weight" name="weight" ref={weightRef} />
        </div>
        <div>
          <label htmlFor="guardianName">보호자 이름</label>
          <input type="text" id="guardianName" name="guardianName" ref={guardianNameRef} />
        </div>
        <div>
          <label htmlFor="guardianNumber">보호자 번호</label>
          <input type="text" id="guardianNumber" name="guardianNumber" ref={guardianNumberRef} />
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default ChangeUiPage;
