/** @format */

import { Navigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

// eslint-disable-next-line react/prop-types
function Protected({ children }) {
  const { user } = UserAuth();
  if (!user) return <Navigate to="/" />;
  return children;
}

export default Protected;
