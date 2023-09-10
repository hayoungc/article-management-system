import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { history } from "../services";

export function PrivateRoute() {
  const auth = useSelector((x) => x.auth?.value);

  if (!auth) {
    return <Navigate to="/login" state={{ from: history.location }} />;
  }

  return <Outlet />;
}
