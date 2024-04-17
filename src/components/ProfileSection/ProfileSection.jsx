import "./ProfileSection.css";
import Profile from "../Profile/Profile.jsx";
import { useUserContext } from "../../UserContextProvider.jsx";
import AuthorizationSection from "../AuthorizationSection/AuthorizationSection.jsx";

export default function ProfileSection() {
  const { userForm } = useUserContext();
  return (
    <>
      {(userForm["id"] > 0 && (
        <>
          <p style={{ fontSize: "40px" }}>Личный кабинет</p>
          <Profile />
        </>
      )) || <AuthorizationSection />}
    </>
  );
}
