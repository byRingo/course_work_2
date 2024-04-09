import InputSection from "../InputSection/InputSection.jsx";
import { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import "./RegistrationSection.css";
export default function RegistrationSection({}) {
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
  useEffect(() => {
    axios
      .get(`https://660eb7bc356b87a55c4fde04.mockapi.io/api/v1/fakeBooking`)
      .then((r) => console.log(r.data))
      .catch((err) => console.log("GET method : " + err));
  }, []);

  function postUser() {
    axios
      .post(`https://660eb7bc356b87a55c4fde04.mockapi.io/api/v1/fakeBooking`, {
        name: input.name,
        email: input.email,
        phone: input.phone,
        password: input.password,
        confirmPassword: input.confirmPassword,
      })
      .catch((err) => console.log("POST method : " + err));
  }
  const onInputChange = (e) => {
    console.log(e.target.value);
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
      </div>
    </>
  );
}
