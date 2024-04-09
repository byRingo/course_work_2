import "./Selector.css";
export default function Selector({ arr }) {
  return (
    <>
      <div className="selectorContainer">
        <p>Количество спальных мест</p>
        <select name="" id="" className="selector">
          <option>Все домики</option>
          {arr.map((cur) => (
            <option value={cur}>{cur}</option>
          ))}
        </select>
      </div>
    </>
  );
}
