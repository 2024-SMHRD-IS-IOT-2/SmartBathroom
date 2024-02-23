import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios';

const ChangeUiPage = () => {
  console.log("inside ChangeU");

  const data = useLocation();
  console.log(data);
  console.log(data.state);

  // const navigate = useNavigate();

  // const [userInfo, setUserInfo] = useState({
  //   userId: '',
  //   userDate: '',
  //   userName: '',
  //   userPw: '',
  //   userNumber: '',
  //   addr: '',
  //   height: '',
  //   weight: '',
  //   guardianName: '',
  //   guardianNumber: '',
  // });


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(`/user/handleModify`, userInfo);
  //     if (response.data.result === "success") {
  //       alert('회원 정보가 성공적으로 수정되었습니다.');
  //       navigate('/user');
  //     } else {
  //       alert('회원 정보 수정에 실패했습니다.');
  //     }
  //   } catch (error) {
  //     console.error('Error updating user info:', error);
  //     alert('회원 정보 수정 중 오류가 발생했습니다.');
  //   }
  // };

  return (
      <div>
        <h1>회원정보 수정</h1>
      </div>
    );
};

export default ChangeUiPage;