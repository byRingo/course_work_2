import InputSection from "../InputSection/InputSection.jsx";
import { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import "./AuthorizationSection.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Exception } from "sass";
import { useUserContext } from "../../UserContextProvider.jsx";
import store from "store";

export default function AuthorizationSection() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { setUserForm } = useUserContext();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  function authorizationUser() {
    const params = new URLSearchParams();
    params.append("username", `${input.email}`);
    params.append("password", `${input.password}`);
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:8000/auth/jwt/login", params)
      .then(() => {
        getUser();
      })
      .catch((err) => {
        if (err.response.status !== 400) {
          throw Exception;
        }
        alert("Неправильный логин или пароль");
      });
  }
  function getUser() {
    axios
      .get("http://localhost:8000/get_current_user")
      .then((response) => {
        setIsAuthorized(true);
        let data = Object.assign(response.data);
        setUserForm(data);
        store.set("userForm", data);
      })
      .catch(() => {
        console.log("Непредвиденная ошибка");
      });
  }

  //TODO : try to import other similar func here
  function validateSubmit() {
    let isWrongFields = false;
    let isErrorFields = false;
    for (let i in input) {
      if (input[i].length === 0) {
        isWrongFields = true;
        setError((prev) => {
          const stateObj = { ...prev, [i]: "" };
          stateObj[i] = `Please enter your ${i}`;
          return stateObj;
        });
      }
      isErrorFields = error[i].length > 0;
    }
    if (!isWrongFields && !isErrorFields) {
      authorizationUser();
    }
  }
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "email":
          if (value.indexOf("@") === -1) {
            stateObj[name] = "Email must contain @";
          }
          if (!value) {
            stateObj[name] = "Please enter your email.";
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };
  return (
    <>
      <div className="auth-cont">
        <p id="auth-text">Авторизация</p>
        <Form className="form">
          <InputSection
            value={input.email}
            onChange={onInputChange}
            onBlur={validateInput}
            name="email"
          />
          {error.email && <span className="err">{error.email}</span>}
          <InputSection
            value={input.password}
            onChange={onInputChange}
            onBlur={validateInput}
            name="password"
            type={"password"}
          />
          {error.password && <span className="err">{error.password}</span>}
          <Button id="reg" onClick={validateSubmit} type="submit">
            Отправить
          </Button>
        </Form>
        <span className="registration-text">
          Еще нет аккаунта? <Link to="/registration">Регистрация</Link>
        </span>
        {isAuthorized && <Navigate to="/" />}
      </div>
    </>
  );
}
