import Button from "../Button/Button.jsx";
import { useState } from "react";

export default function ButtonsSection() {
  let [contentType, setContentType] = useState("Нажми на кнопку");
  function handleClick(contentType) {
    setContentType(contentType);
  }
  return (
    <>
      <Button
        isActive={contentType === "Кнопка 1"}
        onClick={() => handleClick("Кнопка 1")}
      >
        Кнопка 1
      </Button>
      <Button
        isActive={contentType === "Кнопка 2"}
        onClick={() => handleClick("Кнопка 2")}
      >
        Кнопка 2
      </Button>
      <Button
        isActive={contentType === "Button 3"}
        onClick={() => handleClick("Button 3")}
      >
        Кнопка 3
      </Button>
      <p>{contentType}</p>
    </>
  );
}
