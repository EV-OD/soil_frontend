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
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useApp from "../hooks/useFBApp";
import { onValue, ref, set } from "firebase/database";

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
  type: "area",
  fontFamily: "Inter, sans-serif",

  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Soil Moisture Realtime Data",
    },
  },
};

function MoistureChart() {
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
  const [jsonWholeData, setJsonWholeData] = useState({} as any);

  useEffect(() => {
    let wholeDataRef = ref(db, "soilMoisture/wholeData");
    onValue(wholeDataRef, (snapshot) => {
      setJsonWholeData(snapshot.val());
    });
  }, []);

  useEffect(() => {
    let dataJson = jsonWholeData;
    let keysData = Object.keys(jsonWholeData);
    if (keysData.length === 0) return;
    let max = dataJson[keysData[0]].value;
    for (let i = 0; i < keysData.length; i++) {
      if (dataJson[keysData[i]].value > max) {
        max = dataJson[keysData[i]].value;
      }
    }
    let min = dataJson[keysData[0]].value;
    for (let i = 0; i < keysData.length; i++) {
      if (dataJson[keysData[i]].value < min) {
        min = dataJson[keysData[i]].value;
      }
    }

    let highRef = ref(db, "soilMoisture/highValue");
    set(highRef, max);
    let lowRef = ref(db, "soilMoisture/lowValue");
    set(lowRef, min);

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

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "white",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <Line options={options} data={data} style={{ height: "100%" }} />
    </div>
  );
}

export default MoistureChart;
