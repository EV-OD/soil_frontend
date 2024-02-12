import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import useApp from "../hooks/useFBApp";

function MoistureValue() {
  const { db } = useApp();
  const [soilMoisture, setSoilMoisture] = useState(0);
  let soilMoistureRef = ref(db, "soilMoisture/currentValue");

  useEffect(() => {
    onValue(soilMoistureRef, (snapshot) => {
      setSoilMoisture(snapshot.val());
    });
  }, []);

  return (
    <div
      style={{
        width: "80px",
        height: "100%",
        position: "relative",
        backgroundColor: "rgb(50,50,50)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "80px",
          position: "absolute",
          backgroundColor: soilMoisture > 500 ? "red" : "green",
          left: "0",
          bottom: "0",
          zIndex: 1,
          height: (soilMoisture / 1000) * 100 + "%",
        }}
      ></div>
    </div>
  );
}

export default MoistureValue;
