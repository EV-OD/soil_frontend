import { useEffect, useState } from "react";
import high from "../assets/high-meter.svg";
import useApp from "../hooks/useFBApp";
import { onValue, ref } from "firebase/database";

function HighCard() {
  const { db } = useApp();
  const [jsonWholeData, setJsonWholeData] = useState({} as any);
  const [highValue, setHighValue] = useState(0);

  useEffect(() => {
    let wholeDataRef = ref(db, "soilMoisture/wholeData");
    onValue(wholeDataRef, (snapshot) => {
      setJsonWholeData(snapshot.val());
    });

    let highRef = ref(db, "soilMoisture/highValue");
    onValue(highRef, (snapshot) => {
      setHighValue(snapshot.val());
    });
  }, []);
  return (
    <div className="card low">
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <img src={high} />
        <h4>Highest</h4>
      </div>
      <span>{highValue}</span>
    </div>
  );
}

export default HighCard;
