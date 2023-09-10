import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Login, Register } from "./";

export function UserLayout() {
  const auth = useSelector((x) => x.auth?.value);

  if (auth) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}
