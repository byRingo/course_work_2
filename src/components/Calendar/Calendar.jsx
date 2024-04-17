import "react-day-picker/dist/style.css";
import { RangeDatePicker } from "@y0c/react-datepicker";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import "./Calendar.css";

export default function Calendar({ onChange }) {
  const onChangeRangeValue =
    () =>
    (...date) => {
      onChange(date);
    };

  return (
    <div className="calendarContainer">
      <p>Дата</p>
      <div>
        <RangeDatePicker onChange={onChangeRangeValue("date")} />
      </div>
    </div>
  );
}
