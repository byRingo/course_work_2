import HouseCard from "../HouseCard/HouseCard.jsx";
import Calendar from "../Calendar/Calendar.jsx";
import "./MainSection.css";
import Selector from "../Selector/Selector.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button/Button.jsx";
import { useUserContext } from "../../UserContextProvider.jsx";

export default function MainSection() {
  const [housesCards, setHousesCard] = useState([]);
  const [datesArray, setDatesArray] = useState([]);
  const [houseCapacity, setHouseCapacity] = useState(1);
  const { userForm, bookingForm, setBookingForm } = useUserContext();

  function getHouses() {
    if (!datesArray[0]) {
      alert("Введите дату бронирования");
      return;
    }
    const firstDate = datesArray[0].toISOString().slice(0, 10);
    const secondDate = datesArray[1].toISOString().slice(0, 10);

    axios
      .get(
        `http://127.0.0.1:8000/houses/get_with_date_and_cap?fdate=${firstDate}&ldate=${secondDate}&capacity=${houseCapacity}`,
      )
      .then((r) => {
        setBookingForm((prev) => ({
          ...prev,
          fdate: datesArray[0],
          ldate: datesArray[1],
        }));
        setHousesCard(r.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/houses/get_with_address").then((r) => {
      setHousesCard(r.data);
    });
  }, []);
  const handleHouseCardClick = (cur) => {
    setBookingForm((prev) => ({
      ...prev,
      user_id: userForm["id"],
      house_id: cur.id,
    }));
    if (!bookingForm["fdate"]) {
      alert("Введите дату бронирования");
      return;
    }
    axios
      .post("http://127.0.0.1:8000/booking/post", {
        fdate: bookingForm["fdate"],
        ldate: bookingForm["ldate"],
        user_id: bookingForm["user_id"],
        house_id: bookingForm["house_id"],
      })
      .then(() => {
        getHouses();
        alert("Домик успешно забронирован");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="interaction-container">
        <Calendar onChange={(current) => setDatesArray(current)} />
        <Selector
          arr={[1, 2, 3, 4]}
          onChange={(current) => {
            setHouseCapacity(current);
          }}
        ></Selector>
        <Button
          id="submit-button"
          onClick={() => {
            getHouses();
          }}
        >
          Отправить
        </Button>
      </div>
      <div className="components-container">
        {housesCards.map((cur) => (
          <HouseCard
            img={`src/assets/${cur.id}.jpg`}
            key={cur.id}
            address={cur.name_1}
            price={cur.price}
            quantity={cur.capacity}
            onClick={() => handleHouseCardClick(cur)}
          />
        ))}
      </div>
    </>
  );
}
