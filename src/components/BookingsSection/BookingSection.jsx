import "./BookingSection.css";
import Table from "../Table/Table.jsx";
import { useUserContext } from "../../UserContextProvider.jsx";
import MainSection from "../MainSection/MainSection.jsx";
export default function BookingSection() {
  const { userForm } = useUserContext();
  return <>{(userForm["is_superuser"] && <Table />) || <MainSection />}</>;
}
