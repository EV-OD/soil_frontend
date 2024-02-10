import React, { useEffect, useState } from "react";
import { get, ref, set, onValue } from "firebase/database";
import useApp from "../hooks/useFBApp";
import Switch from "react-switch";

function Home() {
  const [autoOnOff, setAutoOnOff] = useState(false);
  const [isMotorOn, setIsMotorOn] = useState(false);
  const [soilMoisture, setSoilMoisture] = useState(0);

  const { db } = useApp();

  useEffect(() => {
    let motorAutoOnOffRef = ref(db, "motor/autoOnOff");
    let motorIsOnRef = ref(db, "motor/isOn");
    let soilMoistureRef = ref(db, "soilMoisture/currentValue");
    onValue(motorAutoOnOffRef, (snapshot) => {
      setAutoOnOff(snapshot.val());
    });
    onValue(motorIsOnRef, (snapshot) => {
      setIsMotorOn(snapshot.val());
    });
    onValue(soilMoistureRef, (snapshot) => {
      setSoilMoisture(snapshot.val());
    });
  }, []);

  const setMotor = (value: boolean) => {
    set(ref(db, "motor/isOn"), value);
    setIsMotorOn(value);
  };

  const setMotorAutoBehavior = (value: boolean) => {
    set(ref(db, "motor/autoOnOff"), value);
    setAutoOnOff(value);
  };

  return (
    <div>
      <h1>home</h1>
      <p>Soil Moisture: {soilMoisture}</p>
      <label htmlFor="autoMotor">Auto Motor</label>
      <Switch
        onChange={() => setMotorAutoBehavior(!autoOnOff)}
        checked={autoOnOff}
      />
      <br />
      {!autoOnOff && (
        <div>
          <label htmlFor="motorOnOff">Motor</label>
          <Switch onChange={() => setMotor(!isMotorOn)} checked={isMotorOn} />
        </div>
      )}
    </div>
  );
}

export default Home;
