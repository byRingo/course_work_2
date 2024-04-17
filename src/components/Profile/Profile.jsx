import "./Profile.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button.jsx";
import { useUserContext } from "../../UserContextProvider.jsx";
import store from "store";
import axios from "axios";

export default function Profile() {
  function userLogout() {
    axios.defaults.withCredentials = true;
    setUserForm({});
    store.set("userForm", {});
    alert("Вы вышли из аккаунта");
    setUserForm({});
  }
  const { userForm, setUserForm } = useUserContext();
  return (
    <>
      <div className="profile-container">
        <p className="username">{userForm["username"]}</p>
        <div className="info-container">
          <p>Почта: {userForm["email"]}</p>
          <p>Номер телефона: {userForm["phone_number"]}</p>
          <p>Личные скидки: 0%</p>
        </div>
        <div className="footer">
          <p>Нужна помощь?</p>
          <p>Пишите: vavoronov_1@edu.hse.ru</p>
          <Link to="/" onClick={userLogout}>
            <Button style={{ background: "#8673A1" }}>Выйти из аккаунта</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
