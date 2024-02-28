import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from '../axios'
import { UserContext } from '../contexts/UserContext';


const AccList = ({ member_id }) => {

    const [isEditing, setIsEditing] = useState({ editing: false, acc_idx: "" }); // info 텍스트 필드 수정여부
    const editInfoRef = useRef(); // info 텍스트 ref
    const [userAccidents, setUserAccidents] = useState([]); // 회원 사고기록

    // 첫 렌더링
    useEffect(() => {

        getAccList();

        //5초마다 새로고침
        const interval = setInterval(getAccList, 5000);
        return () => clearInterval(interval);

    }, [])

    //사고 정보 불러오기
    const getAccList = async () => {
        await axios.post('/user/showAccident', { userId: member_id })
            .then((res) => {
                if (res.data.result === "success") {
                    setUserAccidents(res.data.rows);
                }
                else {
                    setUserAccidents([]);
                    console.log("사고이력 없음.");
                }
            })
            .catch((error) => {
                console.log("사고 정보 불러오기 실패", error);
            });
    }

    // // 사고 처리 완료버튼.
    const updateAccident = (item) => {
        //업데이트할 사고 아이템
        const updatedAccident = { ...item, acc_status: 'N' };

        // 사고아이템 stata 업데이트
        setUserAccidents(curList =>
            curList.map(accident =>
                accident.acc_idx === item.acc_idx ? updatedAccident : accident
            )
        );

        //사고아이템 db업데이트
        updateAccDb(updatedAccident);

    }


    // 수정확인 버튼.
    const updateAccInfo = async (item) => {
        const updatedAccident = { ...item, acc_info: editInfoRef.current.value };
        // 사고아이템 stata 업데이트
        setUserAccidents(curList =>
            curList.map(accident =>
                accident.acc_idx === item.acc_idx ? updatedAccident : accident
            )
        );

        //수정 종료
        setIsEditing({ editing: false, acc_idx: item.acc_idx });
        updateAccDb(updatedAccident);
    };


    // //사고아이템 db업데이트
    const updateAccDb = async (item) => {
        await axios.post('/user/updateAccident', item)
            .then((res) => {
                if (res.data.result === "success") {
                    console.log("업데이트 완료");
                }
            })
            .catch((err) => {
                console.log("에러", err);
            })
    }

    return (

        <div className="acclist-container">

            <h2>사고 이력</h2>
            <ul>
                {userAccidents.map((accident, index) => (
                    <li key={index} style={{ display: "flex" }} className={`${accident.acc_status === "Y" ? 'acclist-highlight' : ''}`}>
                        {/* 컨테이너 */}

                        {/* 내용 */}
                        <div style={{ width: "85%" }}>
                            <p>{new Date(accident.acc_time).toLocaleString()}</p>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                {isEditing.editing && (isEditing.acc_idx === accident.acc_idx) ?
                                    (<input
                                            type='text'
                                            defaultValue={accident.acc_info}
                                            ref={editInfoRef}
                                            style={{height:"30px"}}
                                        />) :
                                    (<p>{accident.acc_info}</p>)}
                            </div>
                        </div>

                        {/* 버튼 */}
                        <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
                            {/* 해결 */}
                            <div className='acclist-btn-container'>
                                {accident.acc_status === "Y" &&
                                    (<button className="acclist-btn" onClick={() => { updateAccident(accident) }} >해결</button>)
                                }
                            </div>

                            {/* 수정 */}
                            <div className='acclist-btn-container'>
                                {isEditing.editing && (isEditing.acc_idx === accident.acc_idx) ?
                                    (
                                        <div style={{ display: "flex", width: "100%", height: "70%", alignItems: "center", justifyContent: "space-between" }}>
                                            <button className="acclist-btn" style={{ width:"48%", color: "black" }} onClick={() => { updateAccInfo(accident) }}>✔</button>
                                            <button className="acclist-btn" style={{ width:"48%", color: "red" }} onClick={() => { setIsEditing({ editing: false, acc_idx: "" }) }}>✖</button>
                                        </div>
                                    ) :
                                    (
                                        <button className="acclist-btn" onClick={() => { setIsEditing({ editing: true, acc_idx: accident.acc_idx }) }}>수정</button>
                                    )
                                }
                            </div>

                        </div>

                    </li>
                ))}
            </ul>

        </div>
    )
}

export default AccList