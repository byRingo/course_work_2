import logo from "/vite.svg";
import "./Header.css";
import Button from "../Button/Button.jsx";
import { useState } from "react";
import { Link, Router } from "react-router-dom";
export default function Header({ active, onChange }) {
  return (
    <header>
      <img src={logo} alt="" />
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
      </div>
      <Link to="/authorization">
        <Button isActive={active === "Вход"} onClick={() => onChange("Вход")}>
          Вход
        </Button>
      </Link>
    </header>
  );
}
