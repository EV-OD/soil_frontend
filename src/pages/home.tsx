import React, { useEffect, useState } from "react";
import { get, ref, set, onValue } from "firebase/database";
import useApp from "../hooks/useFBApp";
import Switch from "react-switch";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Soil Moisture Realtime Data",
    },
  },
};

function Home() {
  const [autoOnOff, setAutoOnOff] = useState(false);
  const [isMotorOn, setIsMotorOn] = useState(false);
  const [soilMoisture, setSoilMoisture] = useState(0);
  const [jsonWholeData, setJsonWholeData] = useState({} as any);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Dataset 1",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const { db } = useApp();

  useEffect(() => {
    let motorAutoOnOffRef = ref(db, "motor/autoOnOff");
    let motorIsOnRef = ref(db, "motor/isOn");
    let soilMoistureRef = ref(db, "soilMoisture/currentValue");
    let wholeDataRef = ref(db, "soilMoisture/wholeData");
    onValue(motorAutoOnOffRef, (snapshot) => {
      setAutoOnOff(snapshot.val());
    });
    onValue(motorIsOnRef, (snapshot) => {
      setIsMotorOn(snapshot.val());
    });
    onValue(soilMoistureRef, (snapshot) => {
      setSoilMoisture(snapshot.val());
    });
    onValue(wholeDataRef, (snapshot) => {
      setJsonWholeData(snapshot.val());
    });
  }, []);

  useEffect(() => {
    deleteOldData();
    let labels: any = [];
    let data: any = [];
    let keys = Object.keys(jsonWholeData);
    keys.forEach((key) => {
      let eachData = jsonWholeData[key];
      let parsedData = JSON.parse(eachData.datetime);
      let date = new Date(parsedData.datetime);
      labels.push(
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
      );
      data.push(eachData.value);
    });
    setData({
      labels: labels,
      datasets: [
        {
          label: "Dataset 1",
          data: data,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  }, [jsonWholeData]);

  const deleteOldData = () => {
    let keys = Object.keys(jsonWholeData);
    if (keys.length <= 10) return;
    let newKeys = keys.slice(keys.length - 10, keys.length);
    let newData: any = {};
    newKeys.forEach((key) => {
      newData[key] = jsonWholeData[key];
    });
    set(ref(db, "soilMoisture/wholeData"), newData);
  };

  const setMotor = (value: boolean) => {
    set(ref(db, "motor/isOn"), value);
    setIsMotorOn(value);
  };

  const setMotorAutoBehavior = (value: boolean) => {
    set(ref(db, "motor/autoOnOff"), value);
    setAutoOnOff(value);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div
        style={{
          width: "50px",
          height: "400px",
          position: "relative",
          backgroundColor: "rgb(50,50,50)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "50px",
            position: "absolute",
            backgroundColor: soilMoisture > 500 ? "red" : "green",
            left: "0",
            bottom: "0",
            zIndex: 1,
            height: (soilMoisture / 1000) * 100 + "%",
          }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "min-content",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "max-content",
            gap: "10px",
          }}
        >
          <label htmlFor="autoMotor">Auto Motor</label>
          <Switch
            onChange={() => setMotorAutoBehavior(!autoOnOff)}
            checked={autoOnOff}
          />
        </div>
        <br />
        {!autoOnOff && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label htmlFor="motor">Motor</label>
            <Switch onChange={() => setMotor(!isMotorOn)} checked={isMotorOn} />
          </div>
        )}
      </div>
      <div style={{ width: "100%" }}>
        <Line options={options} data={data} style={{ height: "100%" }} />
      </div>
    </div>
  );
}

export default Home;
