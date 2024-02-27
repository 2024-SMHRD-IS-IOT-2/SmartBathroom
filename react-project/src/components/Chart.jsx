import React, { useState, useEffect, useContext } from "react";
import ReactECharts from "echarts-for-react";
import axios from "../axios";
import { UserContext } from "../contexts/UserContext";
import moment from "moment";

const Charts = () => {
  const { isLoggedin, loginData } = useContext(UserContext);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [ammoniaData, setAmmoniaData] = useState([]);
  const [xAxisData, setXAxisData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/user/handleChartPage", {
          userId: loginData.member_id,
        });

        //최근 값 100개만 쓰려면
        // const data = res.data.rows.slice(-100);
        const data = res.data.rows;

        setTemperatureData(data.map((item) => item.sensor_temp));
        setHumidityData(data.map((item) => item.sensor_humid));
        setAmmoniaData(data.map((item) => item.sensor_nh3));
        setXAxisData(
          data.map((item) =>
            moment(item.sensored_at).format("YYYY-MM-DD HH:mm:ss")
          )
        );
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };
    fetchData();
    //만약 주기적으로 업데이트하기를 원한다면 주석 풀기
    // const interval = setInterval(fetchData, 5000); // 5초마다 업데이트
    // return () => clearInterval(interval);
  }, []);
  console.log(temperatureData);
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <ReactECharts
        option={getOption(temperatureData, "온도 (°C)", xAxisData)}
      />
      <ReactECharts option={getOption(humidityData, "습도 (%)", xAxisData)} />
      <ReactECharts
        option={getOption(ammoniaData, "암모니아 (PPM)", xAxisData)}
      />
    </div>
  );
};

const getOption = (data, yAxisName, xAxisData) => {
  return {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [yAxisName],
    },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
      name: yAxisName,
    },
    series: [
      {
        name: yAxisName,
        type: "line",
        data: data,
      },
    ],
  };
};

export default Charts;
