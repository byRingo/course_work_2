import "./HouseCard.css";
import Button from "../Button/Button.jsx";

export default function HouseCard({ img, quantity, price, address, onClick }) {
  return (
    <>
      <div className="card">
        <img className="house-img" src={img} alt="" />
        <div className="cell">
          <img
            className="bed"
            src="src/assets/bed-svgrepo-com.svg"
            alt="Количество спальных мест"
          ></img>
          <p
            style={{
              marginTop: "5px",
            }}
          >
            {quantity}
          </p>
        </div>
        <div className="cell" style={{ paddingRight: "50px" }}>
          <p>Цена за ночь</p>
          <p>{price}</p>
        </div>
        <div className="cell">
          <p>Адрес</p>
          <p>{address}</p>
        </div>
        <Button
          style={{ marginTop: "auto", marginBottom: "auto" }}
          onClick={() => {
            onClick();
          }}
        >
          Забронировать
        </Button>
      </div>
    </>
  );
}
