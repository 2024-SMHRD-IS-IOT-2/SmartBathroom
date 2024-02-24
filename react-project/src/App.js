import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // BrowserRouter as Router 삭제
import HomePage from './pages/HomePage'; // 홈 페이지 컴포넌트 임포트
import LoginPage from './pages/LoginPage'; // 로그인 페이지 컴포넌트 임포트
import JoinPage from './pages/JoinPage'; // 회원가입 페이지 컴포넌트 임포트
import UserPage from './pages/UserPage'; // 사용자 페이지 컴포넌트 임포트
import AdminPage from './pages/AdminPage'; // 관리자 페이지 컴포넌트 임포트
import ChartPage from './pages/ChartPage'; // 차트 페이지 컴포넌트 임포트
import ChangeUiPage from './pages/ChangeUiPage'; // 정보 변경 페이지 컴포넌트 임포트
import TopMenu from './components/TopMenu';
import { UserContext } from './contexts/UserContext';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState(null);


  return (
    <div>

    <UserContext.Provider value = {{isLoggedIn, setIsLoggedIn, loginData, setLoginData}}>
      <TopMenu />
      <div style={{paddingTop: "40px"}}>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/join" element={<JoinPage />} /> 
          <Route path="/user" element={<UserPage />} /> 
          <Route path="/admin" element={<AdminPage />} /> 
          <Route path="/chart" element={<ChartPage />} /> 
          <Route path="/changeui" element={<ChangeUiPage />} />
        </Routes>
      </div>
    </UserContext.Provider>

    </div>
  );
}

export default App; // App 컴포넌트를 내보냅니다.
