import React, { useEffect, useState } from 'react';

const AlertComponent = ({ message, duration, key, backgroundColor }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);
      return () => clearTimeout(timer); // 컴포넌트 언마운트 또는 재렌더링 시 타이머 클리어
    }
  }, [message, duration, key]);

  if (!show || !message) return null;

  return (
    <div style={{ textAlign:'center' ,position: 'fixed', top:'30%', left: '50%', transform: 'translateX(-50%)', padding: '20px 40px', borderRadius: '30px', zIndex: 1000, fontSize:'25px', backgroundColor }}>
      {message}
    </div>
  );
};

export default AlertComponent;
