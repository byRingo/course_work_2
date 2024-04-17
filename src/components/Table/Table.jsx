import "./Table.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../Button/Button.jsx";
export default function Table() {
  const [bookings, setBookings] = useState([]);
  const [isBookingChange, setIsBookingChange] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/booking/get").then((r) => {
      setBookings(() => r.data);
    });
  }, [isBookingChange]);
  const handleBookingDeleteClick = (bookingID) => {
    axios
      .delete(`http://127.0.0.1:8000/booking/delete?booking_id=${bookingID}`)
      .then(() => {
        confirm("Вы уверены, что хотите удалить данную запись ?");
        setIsBookingChange(!isBookingChange);
      });
  };
  return (
    <div className="booking">
      <table className="table">
        <thead
          className="header"
          style={{ backgroundColor: "#9a6aae", color: "#ffffff" }}
        >
          <tr>
            <td className="col">Начало брони</td>
            <td className="col">Конец брони</td>
            <td className="col">Почта</td>
            <td className="col">Номер дома</td>
          </tr>
        </thead>
        <tbody
          className="data"
          style={{ backgroundColor: " #f3eaea", color: "#000000" }}
        >
          {bookings.map((cur) => (
            <tr className="smth" key={cur.id}>
              <td className="row">{cur.fdate}</td>
              <td className="row">{cur.ldate}</td>
              <td className="row">{cur.email}</td>
              <td className="row">{cur.house_id}</td>
              <div className="buttons">
                <Button onClick={() => handleBookingDeleteClick(cur.id)}>
                  Удалить
                </Button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
