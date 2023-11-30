import React from "react";
import { LiaAtomSolid } from "react-icons/lia";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaSignInAlt } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "../STYLE/signOut.css";

const Header = ({ cookies, fun }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div
            style={{ backgroundColor: "#151515" }}
            className="col-sm-12  d-flex justify-content-between align-items-center"
          >
            <div>
              <h1 className="text-secondary display-3">
                <LiaAtomSolid />
              </h1>
            </div>
            <div>{/* <h1 className="text-white">SIGN IN</h1> */}</div>
            <div>
              <h5 className="text-white">Welcome {cookies.username}</h5>
              <p
                className="text-danger text-center h6 text-color"
                onClick={() => {
                  fun();
                }}
              >
                LOGOUT
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
