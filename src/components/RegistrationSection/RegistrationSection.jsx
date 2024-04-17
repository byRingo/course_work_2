import InputSection from "../InputSection/InputSection.jsx";
import { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import "./RegistrationSection.css";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../UserContextProvider.jsx";

export default function RegistrationSection() {
  const { setUserForm } = useUserContext();
  const [isRegistered, setIsRegistered] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

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
      if (error[i].length > 0) {
        isErrorFields = true;
      }
    }
    if (!isWrongFields && !isErrorFields) {
      postUser();
    }
  }

  function postUser() {
    axios
      .post("http://127.0.0.1:8000/auth/register", {
        username: input.name,
        email: input.email,
        phone_number: input.phone,
        password: input.password,
      })
      .then((r) => console.log("User successfully added", r))
      .then(() => alert("Вы успешно зарегистрированы"))
      .then(setUserForm([]))
      .then(setIsRegistered(true))
      .catch(() => console.log("User with this email already exist"));
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
        case "name":
          if (!value) {
            stateObj[name] = "Please enter your name.";
          }
          break;
        case "email":
          if (!value) {
            stateObj[name] = "Please enter your email.";
          }
          if (!/\S+@\S+\.\S+/.test(value)) {
            stateObj[name] = "Wrong email";
          }
          break;
        case "phone":
          if (!value) {
            stateObj[name] = "Please enter your phone.";
          }
          if (value.length !== 11) {
            stateObj[name] = "Phone number must be 11 characters long";
          }
          if (!+value) {
            stateObj[name] = "Phone number must consist of numbers";
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
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
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
      <div className="registration-cont">
        <p id="auth-text">Регистрация</p>
        <Form className="form">
          <InputSection
            value={input.name}
            onChange={onInputChange}
            onBlur={validateInput}
            name="name"
          />
          {error.name && <span className="err">{error.name}</span>}
          <InputSection
            value={input.email}
            onChange={onInputChange}
            onBlur={validateInput}
            name="email"
          />
          {error.email && <span className="err">{error.email}</span>}
          <InputSection
            value={input.phone}
            onChange={onInputChange}
            onBlur={validateInput}
            name="phone"
          />
          {error.phone && <span className="err">{error.phone}</span>}
          <InputSection
            value={input.password}
            onChange={onInputChange}
            onBlur={validateInput}
            name="password"
            type={"password"}
          />
          {error.password && <span className="err">{error.password}</span>}
          <InputSection
            value={input.confirmPassword}
            onChange={onInputChange}
            onBlur={validateInput}
            name="confirmPassword"
            type={"password"}
          />
          {error.confirmPassword && (
            <span className="err">{error.confirmPassword}</span>
          )}
          <Button id="reg" onClick={validateSubmit} type="submit">
            Отправить
          </Button>
        </Form>
        {isRegistered && <Navigate to="/authorization" replace={true} />}
      </div>
    </>
  );
}
