import ReactSwitch from "react-switch";
import { useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import useApp from "../hooks/useFBApp";

function Mode() {
  const [autoOnOff, setAutoOnOff] = useState(false);
  const [isMotorOn, setIsMotorOn] = useState(false);
  const { db } = useApp();

  useEffect(() => {
    let motorAutoOnOffRef = ref(db, "motor/autoOnOff");
    let motorIsOnRef = ref(db, "motor/isOn");
    onValue(motorAutoOnOffRef, (snapshot) => {
      setAutoOnOff(snapshot.val());
    });
    onValue(motorIsOnRef, (snapshot) => {
      setIsMotorOn(snapshot.val());
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
    <div className="card mode">
      <div className="left switch">
        <ReactSwitch
          checked={autoOnOff}
          onChange={() => setMotorAutoBehavior(!autoOnOff)}
        />
        <span>Auto</span>
      </div>
      {!autoOnOff && (
        <div className="right switch">
          <ReactSwitch
            checked={isMotorOn}
            onChange={() => setMotor(!isMotorOn)}
          />
          <span>Manual</span>
        </div>
      )}
      <div className="right"></div>
    </div>
  );
}

export default Mode;
