import { useContext } from "react";

import { AuthContext } from "../context/useAuthContext";

const IsLoggedIn = ({ children, fallback }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return <>{isLoggedIn ? <>{children}</> : <>{fallback}</>}</>;
};

export default IsLoggedIn;
