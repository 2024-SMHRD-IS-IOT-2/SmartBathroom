import React, { useContext, useEffect, useState } from 'react'
import AlertComponent from './AlertComponent'
import { UserContext } from '../contexts/UserContext';

const TestAlert = () => {

    const msg = {message:"msg", duration:1000, backgroundColor:"yellow"}; // 알림 메시지
    const  [trigAlert, setTrigAlert] = useState(false);


    useEffect(()=>{
        const interval = setInterval(repeat, 2000);
        return () => clearInterval(interval);

    },[])

    const repeat = ()=>{
        console.log("5초간격", trigAlert);
        setTrigAlert(trigAlert => !trigAlert);
    }

  return (
    <div>
        <AlertComponent alertInfo={msg} trig = {trigAlert}/>
    </div>
  )
}

export default TestAlert