import HouseCard from "../HouseCard/HouseCard.jsx";
import Calendar from "../Calendar/Calendar.jsx";
import "./MainSection.css";
import Selector from "../Selector/Selector.jsx";
export default function MainSection() {
  return (
    <>
      <div className="interaction-container">
        <div className="mainCalendar">
          <Calendar />
        </div>
        <Selector arr={[1, 2, 3, 4]}></Selector>
      </div>
      <div className="components-container">
        <HouseCard />
        <HouseCard />
        <HouseCard />
        <HouseCard />
      </div>
    </>
  );
}
