import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(false);
  const loginUser = () => {
    setUser(true);
  };
  const logoutUser = () => {
    setUser(false);
  };
  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
