import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import '../App.css';
import BottomText from '../components/BottomText';

const JoinPage = () => {
  const navigate = useNavigate();

  const addrRef = useRef(); // 주소 입력 필드를 위한 ref
  const [loginError, setLoginError] = useState('');

  // 주소 검색 API 호출 함수
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        if (addrRef.current) {
          addrRef.current.value = data.address;
        }
      }
    }).open();
  };

  // 각 입력 필드에 대한 ref 생성
  const userIdRef = useRef();
  const userPwRef = useRef();
  const userPw2Ref = useRef();
  const userNameRef = useRef();
  const userNumberRef = useRef();
  const birthDateRef = useRef();
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
      console.log(inputs.userPw, inputs.userPw2);
      setLoginError("비밀번호가 일치하지 않습니다.");
      return;
    }

    const userData = { ...inputs };

    try {
      // 회원가입 요청 주소 수정
      await axios.post('/user/handleJoin', userData)
        .then((res) => {

          switch (res.data.result) {
            case 'dup': // 회원 아이디 중복
              alert("중복된 아이디입니다.");
              break;
            case 'success': // 회원가입 성공.  로그인 페이지로 이동
              alert("회원가입되셨습니다. 로그인해주세요");
              navigate('/login');
              break;
            case 'fail': // 회원가입 실패 (데이터베이스 insert 오류)
              alert("회원가입에 실패했습니다. 다시 입력해주세요");
              navigate('/join');
              break;

            default:
              break;
          }

        });
      ;

    } catch (error) {
      console.error('Error:', error);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span className='gohome-logo' onClick={() => navigate('/')}>SIoT</span>
      <h1 className='joinpage-top-text'>회원가입</h1>
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
        <div style={{ color: 'red', marginBottom: '10px', marginTop: '1px' }}>{loginError}</div>
        <div>
          <label htmlFor="userName">이름</label>
          <input type="text" id="userName" ref={userNameRef} />
        </div>
        <div>
          <label htmlFor="userNumber">연락처 ('-'없이 숫자만 입력해주세요)</label>
          <input type="text" id="userNumber" ref={userNumberRef} placeholder='000-0000-0000' maxLength="11" />
        </div>
        <div>
          <label htmlFor="birthDate">생년월일</label>
          <input type="date" id="birthDate" ref={birthDateRef} />
        </div>
        <div>
          <label htmlFor="addr">주소</label>
          <input type="text" id="addr" ref={addrRef} />
          <button type="button" className="addrBtn" onClick={handleAddressSearch}>주소 검색</button>
        </div>
        <div>
          <label htmlFor="height">키 (cm)</label>
          <input type="text" id="height" ref={heightRef} maxLength="5" placeholder="숫자만 입력해주세요" />
        </div>
        <div>
          <label htmlFor="weight">몸무게 (kg)</label>
          <input type="text" id="weight" ref={weightRef} maxLength="5" placeholder="숫자만 입력해주세요" />
        </div>
        <div>
          <label htmlFor="guardianName">보호자 이름</label>
          <input type="text" id="guardianName" ref={guardianNameRef} />
        </div>
        <div>
          <label htmlFor="guardianNumber">보호자 번호 ('-'없이 숫자만 입력해주세요)</label>
          <input type="text" id="guardianNumber" ref={guardianNumberRef} placeholder='000-0000-0000' maxLength="11" />
        </div>
        <button type="submit" className='form-check-btn'>확인</button>
      </form>
      <BottomText />
    </div>
  );
};

export default JoinPage;
