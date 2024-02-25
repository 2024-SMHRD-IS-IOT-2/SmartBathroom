import React from 'react'
import { useNavigate } from 'react-router-dom'


const BottomText = () => {
    const navigate = useNavigate();
    return (

        <div><p className='bottom-copyx-text'><span className='bottom-gohome-logo' onClick={() => navigate('/')}>SIoT</span><span>Copyright © Smart-IoT Corp. All Rights Reserved.</span></p></div>
    )
}

export default BottomText