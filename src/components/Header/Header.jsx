import "./Header.css";
import Button from "../Button/Button.jsx";
import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContextProvider.jsx";
import store from "store";

export default function Header({ active, onChange }) {
  const { userForm, setUserForm } = useUserContext();
  return (
    <>
      {Object.keys(userForm).length === 0 &&
        Object.keys(store.get("userForm")).length > 0 &&
        setUserForm(store.get("userForm"))}

      <header>
        <img id="logo" src="src/assets/logo.jpg" alt="" />
        <div className="nav">
          <Link to="/">
            <Button
              isActive={active === "Главная"}
              onClick={() => onChange("Главная")}
            >
              Главная
            </Button>
          </Link>
          <Link to="/path">
            <Button
              isActive={active === "Как добраться"}
              onClick={() => onChange("Как добраться")}
            >
              Как добраться
            </Button>
          </Link>
          <Link to="/about">
            <Button
              isActive={active === "О нас"}
              onClick={() => onChange("О нас")}
            >
              О нас
            </Button>
          </Link>
          {userForm["is_superuser"] === true && (
            <>
              <Link to="/bookings">
                <Button
                  isActive={active === "Админ"}
                  onClick={() => onChange("Админ")}
                >
                  Админ
                </Button>
              </Link>
            </>
          )}
        </div>
        <Link to={(userForm["id"] > 0 && "/profile") || "/authorization"}>
          <Button isActive={active === "Вход"} onClick={() => onChange("Вход")}>
            {(userForm["id"] > 0 && "Личный кабинет") || "Вход"}
          </Button>
        </Link>
      </header>
    </>
  );
}
