import Header from "./components/Header/Header.jsx";
import { useState } from "react";
import AuthorizationSection from "./components/AuthorizationSection/AuthorizationSection.jsx";
import { Route, Routes } from "react-router-dom";
import RegistrationSection from "./components/RegistrationSection/RegistrationSection.jsx";
import PathSection from "./components/PathSection/PathSection.jsx";
import MainSection from "./components/MainSection/MainSection.jsx";

export default function App() {
  const [section, setSection] = useState("Главная");
  return (
    <>
      <Header active={section} onChange={(current) => setSection(current)} />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/path" element={<PathSection />} />
        <Route path="/about" element={<p>About us</p>} />
        <Route path="/authorization" element={<AuthorizationSection />} />
        <Route path="/registration" element={<RegistrationSection />} />
      </Routes>
    </>
  );
}
