import { useContext } from "react";

import { AuthContext } from "../context/useAuthContext";
import {NavLink} from "react-router-dom";
import {UserIcon} from "@heroicons/react/20/solid";

const Auth = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  const handleAuth = () => {
    if (isLoggedIn) {
      logout();
    } else {
      login("token");
    }
  };

  return (
    <>
      {isLoggedIn ? (
          <div className="flex">

              <NavLink  onClick={handleAuth}>Logout</NavLink>
          </div>
      ) : (
          <div className="flex">
              <NavLink className="flex" to="/login">Login <UserIcon
                  className="heroIcon  ml-[10px]"/></NavLink>

          </div>
      )}
    </>
  );
};

export default Auth;
