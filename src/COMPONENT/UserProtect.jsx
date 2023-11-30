import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserProtect = ({ data }) => {
  let saveToken = data;
  return saveToken.jwt ? <Navigate to="/Url" /> : <Outlet />;
};

export default UserProtect;
