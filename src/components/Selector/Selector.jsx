import "./Selector.css";
import { useState } from "react";
export default function Selector({ arr, onChange }) {
  const [selectedOption, setSelectedOption] = useState(arr[0]);
  return (
    <>
      <div className="selectorContainer">
        <p>Количество спальных мест</p>
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            onChange(e.target.value);
          }}
          className="selector"
        >
          {arr.map((cur) => (
            <option key={cur - 1} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
