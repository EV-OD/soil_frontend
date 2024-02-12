import { useEffect, useState } from "react";
import low from "../assets/low-meter.svg";
import { onValue, ref } from "firebase/database";
import useApp from "../hooks/useFBApp";

function LowCard() {
  const { db } = useApp();
  const [lowValue, setLowValue] = useState(0);

  useEffect(() => {
    let highRef = ref(db, "soilMoisture/lowValue");
    onValue(highRef, (snapshot) => {
      setLowValue(snapshot.val());
    });
  }, []);
  return (
    <div className="card low">
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <img src={low} />
        <h4>Lowest</h4>
      </div>
      <span>{lowValue}</span>
    </div>
  );
}

export default LowCard;
