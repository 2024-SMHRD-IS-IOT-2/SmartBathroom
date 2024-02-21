import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import './JoinPage.css';

const JoinPage = () => {
  const navigate = useNavigate();

  // 각 입력 필드에 대한 ref 생성
  const userIdRef = useRef();
  const userPwRef = useRef();
  const userPw2Ref = useRef();
  const userNameRef = useRef();
  const userNumberRef = useRef();
  const birthDateRef = useRef();
  const addrRef = useRef();
  const heightRef = useRef();
  const weightRef = useRef();
  const guardianNameRef = useRef();
  const guardianNumberRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // useRef를 사용하여 각 입력 필드의 현재 값을 가져옴
    const inputs = {
      userId: userIdRef.current.value.trim(),
      userPw: userPwRef.current.value.trim(),
      userPw2: userPw2Ref.current.value.trim(),
      userName: userNameRef.current.value.trim(),
      userNumber: userNumberRef.current.value.trim(),
      birthDate: birthDateRef.current.value.trim(),
      addr: addrRef.current.value.trim(),
      height: heightRef.current.value.trim(),
      weight: weightRef.current.value.trim(),
      guardianName: guardianNameRef.current.value.trim(),
      guardianNumber: guardianNumberRef.current.value.trim(),
    };

    const isEmptyOrSpace = Object.values(inputs).some(value => value === '');
    if (isEmptyOrSpace) {
      alert('모든 필드를 채워주세요. 공백만 있는 입력은 허용되지 않습니다.');
      return;
    }

    // 비밀번호 확인 로직
    if (inputs.userPw !== inputs.userPw2) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    const userData = {...inputs};

    try {
      await axios.post('/user/join', userData); // 회원가입 요청 주소 수정
      navigate('/login'); // 성공 시 로그인 페이지로 이동
    } catch (error) {
      console.error('Error:', error);
      alert('회원가입에 실패했습니다.');
    }
  };
  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">아이디</label>
          <input type="text" id="userId" ref={userIdRef} />
        </div>
        <div>
          <label htmlFor="userPw">비밀번호</label>
          <input type="password" id="userPw" ref={userPwRef} />
        </div>
        <div>
          <label htmlFor="userPw2">비밀번호 확인</label>
          <input type="password" id="userPw2" ref={userPw2Ref} />
        </div>
        <div>
          <label htmlFor="userName">이름</label>
          <input type="text" id="userName" ref={userNameRef} />
        </div>
        <div>
          <label htmlFor="userNumber">연락처</label>
          <input type="text" id="userNumber" ref={userNumberRef} placeholder='000-0000-0000' />
        </div>
        <div>
          <label htmlFor="birthDate">생년월일</label>
          <input type="text" id="birthDate" ref={birthDateRef} placeholder='0000/00/00' />
        </div>
        <div>
          <label htmlFor="addr">주소</label>
          <input type="text" id="addr" ref={addrRef} />
        </div>
        <div>
          <label htmlFor="height">키</label>
          <input type="text" id="height" ref={heightRef} placeholder='cm' />
        </div>
        <div>
          <label htmlFor="weight">몸무게</label>
          <input type="text" id="weight" ref={weightRef} placeholder='kg' />
        </div>
        <div>
          <label htmlFor="guardianName">보호자이름</label>
          <input type="text" id="guardianName" ref={guardianNameRef} />
        </div>
        <div>
          <label htmlFor="guardianNumber">보호자번호</label>
          <input type="text" id="guardianNumber" ref={guardianNumberRef} placeholder='000-0000-0000' />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default JoinPage;
