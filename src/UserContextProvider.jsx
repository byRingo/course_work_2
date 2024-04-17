import { createContext, useContext, useState } from "react";

export const UserContext = createContext({});

export function useUserContext() {
  return useContext(UserContext);
}
export const UserContextProvider = ({ children }) => {
  const [userForm, setUserForm] = useState({});
  const [bookingForm, setBookingForm] = useState({});

  return (
    <UserContext.Provider
      value={{ userForm, setUserForm, bookingForm, setBookingForm }}
    >
      {children}
    </UserContext.Provider>
  );
};
