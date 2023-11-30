import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forget from "./Forget";
import Url from "./Url";
import GetAllUrl from "./GetAllUrl";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import Email from "./Email";
import cookie from "js-cookie";
import ProtectedRoutes from "./ProtectedRoutes";
import UserProtect from "./UserProtect";
import axios from "axios";

const Main = () => {
  const [saveTokenOne, setsaveToken] = useState("");
  let cookies = cookie.get();
  useEffect(() => {
    setsaveToken(cookies);
  }, []);
  const fun = async () => {
    try {
      await axios({
        method: "get",
        url: "/api/signout",
      });
      setsaveToken("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserProtect data={saveTokenOne} />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/emailValidation" element={<Email />} />
        </Route>
        <Route element={<ProtectedRoutes data={saveTokenOne} />}>
          <Route
            path="/url"
            element={
              <Url
                cookies={cookies}
                saveTokenOne={saveTokenOne}
                fun={fun}
                setsaveToken={setsaveToken}
              />
            }
          />
          <Route
            path="/ShowUrl"
            fun={fun}
            element={<GetAllUrl cookies={cookies} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
