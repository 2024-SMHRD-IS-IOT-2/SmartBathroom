import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios';

const ChangeUiPage = () => {

  const data = useLocation();
  console.log(data.state);

  const navigate = useNavigate();
  // const [sessionData, setSessionData] = useState({}); // session 데이터 상태

  const userIdRef = useRef();
  const birthDateRef = useRef();
  const userNameRef = useRef();
  const userPwRef = useRef();
  const userNumberRef = useRef();
  const addrRef = useRef();
  const heightRef = useRef();
  const weightRef = useRef();
  const guardianNameRef = useRef();
  const guardianNumberRef = useRef();

  // useEffect(() => {
  //   const fetchSessionData = async () => {
  //     try {
  //       const response = await axios.get('/user/getSession');
  //       setSessionData(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error('Error fetching session data:', error);
  //     }
  //   };

  //   fetchSessionData();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUserInfo = {
      userId: userIdRef.current.value,
      birthDate: birthDateRef.current.value,
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
          <input type="text" id="userId" name="userId" defaultValue={data.state.member_id} ref={userIdRef} readOnly/>
        </div>
        <div>
          <label htmlFor="birthDate">생년월일</label>
          <input type="text" id="birthDate" name="birthDate" defaultValue={data.state.member_birthdate.slice(0,10)} ref={birthDateRef} placeholder='0000-00-00' readOnly/>
        </div>
        <div>
          <label htmlFor="userName">이름</label>
          <input type="text" id="userName" name="userName" defaultValue={data.state.member_name} ref={userNameRef} />
        </div>
        <div>
          <label htmlFor="userPw">비밀번호</label>
          <input type="password" id="userPw" name="userPw" defaultValue={data.state.member_pw} ref={userPwRef} />
        </div>
        <div>
          <label htmlFor="userNumber">전화번호</label>
          <input type="text" id="userNumber" name="userNumber" defaultValue={data.state.member_phone} ref={userNumberRef} placeholder='000-0000-0000'/>
        </div>
        <div>
          <label htmlFor="addr">주소</label>
          <input type="text" id="addr" name="addr" defaultValue={data.state.member_addr} ref={addrRef} />
        </div>
        <div>
          <label htmlFor="height">키</label>
          <input type="text" id="height" name="height" defaultValue={data.state.member_height} ref={heightRef} placeholder='cm'/>
        </div>
        <div>
          <label htmlFor="weight">몸무게</label>
          <input type="text" id="weight" name="weight" defaultValue={data.state.member_weight} ref={weightRef} placeholder='kg'/>
        </div>
        <div>
          <label htmlFor="guardianName">보호자 이름</label>
          <input type="text" id="guardianName" name="guardianName" defaultValue={data.state.guardian_name} ref={guardianNameRef} />
        </div>
        <div>
          <label htmlFor="guardianNumber">보호자 번호</label>
          <input type="text" id="guardianNumber" name="guardianNumber" defaultValue={data.state.guardian_phone} ref={guardianNumberRef} placeholder='000-0000-0000'/>
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default ChangeUiPage;