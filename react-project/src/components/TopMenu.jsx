import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import axios from '../axios';

const TopMenu = () => {
    const navigate = useNavigate();

    const { isLoggedin, setIsLoggedin, loginData } = useContext(UserContext);


    //홈 화면으로
    const goToHome = () => {
        navigate('/');
    };

    //로그인화면으로
    const goToLogin = () => {
        navigate('/login');

    };

    //로그아웃
    const logout = async () => {

        await axios.post('/user/handleLogout')
            .then((res) => {
                if (res.data.result === "success") {
                    alert("로그아웃되셨습니다.");
                    setIsLoggedin(false);
                    navigate('/');
                }
            })
    }

    //유저,관리자 메인화면
    const goToMain = () =>{
        loginData.member_id === "admin" ? 
        (navigate('/admin')):
        (navigate('/user'));
    }


    return (
        <div className='topmenu-container'>
            <div className='topmenu-title'>SIOT 스마트 화장실</div>
            {isLoggedin ?
                (<div>
                    <span style={{marginRight:"30px"}}>{loginData.member_name} 님</span>
                    
                    <button className="topmenu-btn" onClick={goToMain} >메인화면</button>
                    <button className="topmenu-btn" onClick={goToHome} >홈</button>
                    <button className="topmenu-btn" onClick={logout}>로그아웃</button>

                </div>) :
                (<div>
                    <button className="topmenu-btn" onClick={goToHome} >홈</button>
                    <button className="topmenu-btn" onClick={goToLogin}>로그인</button>
                </div>)
            }
        </div>
    )
}

export default TopMenu