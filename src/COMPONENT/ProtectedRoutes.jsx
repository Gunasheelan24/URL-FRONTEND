import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ data }) => {
  let saveToken = data;
  return saveToken.jwt ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
