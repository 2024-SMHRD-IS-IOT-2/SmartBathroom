import React, { useState, useEffect, useContext } from "react";
import ReactECharts from "echarts-for-react";
import axios from "../axios";
import { UserContext } from "../contexts/UserContext";
import moment from "moment";
import "../App.css";

const Charts = () => {
  const { isLoggedin, loginData } = useContext(UserContext);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [ammoniaData, setAmmoniaData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [showTemperature, setShowTemperature] = useState(true);
  const [showHumidity, setShowHumidity] = useState(false);
  const [showAmmonia, setShowAmmonia] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/user/handleChartPage", {
          userId: loginData.member_id,
        });

        const data = res.data.rows;
        setTemperatureData(data.map((item) => item.sensor_temp));
        setHumidityData(data.map((item) => item.sensor_humid));
        setAmmoniaData(data.map((item) => item.sensor_nh3));
        setHourlyData(data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000); // 5초마다 fetchData 함수 실행
    return () => clearInterval(interval);
  }, []);

  const toggleTemperature = () => {
    setShowTemperature(true);
    setShowHumidity(false);
    setShowAmmonia(false);
  };

  const toggleHumidity = () => {
    setShowTemperature(false);
    setShowHumidity(true);
    setShowAmmonia(false);
  };

  const toggleAmmonia = () => {
    setShowTemperature(false);
    setShowHumidity(false);
    setShowAmmonia(true);
  };

  const temperatureUpperLimit = 30;
  const temperatureLowerLimit = 10;
  const humidityUpperLimit = 80;
  const humidityLowerLimit = 40;
  const ammoniaUpperLimit = 50;

  const getOption = (data, yAxisName, xAxisData, upperLimit, lowerLimit) => {
    return {
      textStyle: {
        fontSize: 20,
        fontFamily: "JalnanGothic",
      },
      tooltip: {
        trigger: "axis",
        formatter: function (params) {
          const dataIndex = params[0].dataIndex;
          const time = moment(xAxisData[dataIndex]).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          const value = params[0].value;
          return `${time}<br />${yAxisName}: ${value}`;
        },
      },
      xAxis: {
        type: "category",
        data: xAxisData,
        axisLabel: {
          formatter: function (value) {
            return moment(value).format("DD일 HH시");
          },
          textStyle: {
            fontSize: 15,
          },
        },
      },
      yAxis: {
        type: "value",
        name: yAxisName,
        axisLabel: {
          textStyle: {
            fontSize: 15,
          },
        },
      },
      series: [
        {
          name: yAxisName,
          type: "line",
          data: data,
        },
        {
          name: "상한선",
          type: "line",
          data: new Array(data.length).fill(upperLimit),
          lineStyle: {
            color: "red",
            type: "dashed",
          },
          markLine:
            upperLimit !== undefined
              ? { data: [{ yAxis: upperLimit }] }
              : undefined,
        },
        {
          name: "하한선",
          type: "line",
          data:
            lowerLimit !== undefined
              ? new Array(data.length).fill(lowerLimit)
              : [],
          lineStyle: {
            color: "blue",
            type: "dashed",
          },
          markLine:
            lowerLimit !== undefined
              ? { data: [{ yAxis: lowerLimit }] }
              : undefined,
        },
      ],
    };
  };

  // x축 데이터 설정
  const xAxisData = hourlyData.map((item) => moment(item.sensored_at).toDate());

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        style={{
          height: "100%",
        }}
      >
        {showTemperature && (
          <ReactECharts
            className="echarts-root"
            option={getOption(
              temperatureData,
              "온도 (°C)",
              xAxisData,
              temperatureUpperLimit,
              temperatureLowerLimit
            )}
          />
        )}
        {showHumidity && (
          <ReactECharts
            className="echarts-root"
            option={getOption(
              humidityData,
              "습도 (%)",
              xAxisData,
              humidityUpperLimit,
              humidityLowerLimit
            )}
          />
        )}
        {showAmmonia && (
          <ReactECharts
            className="echarts-root"
            option={getOption(
              ammoniaData,
              "암모니아 (PPM)",
              xAxisData,
              ammoniaUpperLimit
            )}
          />
        )}
      </div>

      <div style={{ width: "60%", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <button className="topmenu-btn" onClick={toggleTemperature}>
            온도
          </button>
          <button className="topmenu-btn" onClick={toggleHumidity}>
            습도
          </button>
          <button className="topmenu-btn" onClick={toggleAmmonia}>
            암모니아
          </button>
        </div>
      </div>
    </div>
  );
};

export default Charts;
