import NavBar from "../components/navbar/navbar";
import LowCard from "../components/lowCard";
import HighCard from "../components/high";
import Mode from "../components/mode";
import MoistureValue from "../components/moistureValue";
import MoistureChart from "../components/moistureChart";

function Home() {
  return (
    <div className="home">
      <NavBar />
      <main className="main-section">
        <div className="top">
          <LowCard />
          <HighCard />
          <Mode />
        </div>
        <div className="bottom">
          <div className="b-left">
            <div className="container">
              <MoistureChart />
            </div>
          </div>
          <div className="b-right">
            <MoistureValue />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
