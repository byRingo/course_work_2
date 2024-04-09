import InputSection from "../InputSection/InputSection.jsx";
import { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import "./AuthorizationSection.css";
import { Link } from "react-router-dom";

export default function AuthorizationSection() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

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
      //TODO: if(all good){}
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
          if (!value) {
            stateObj[name] = "Please enter your email.";
          }
          if (value.indexOf("@") === -1) {
            stateObj[name] = "Email must contain @";
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
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
      </div>
    </>
  );
}
