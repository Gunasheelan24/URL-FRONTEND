import React, { useState } from "react";
import Header from "./Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../STYLE/forget.css";
import { Link, useNavigate } from "react-router-dom";

const Forget = () => {
  let navi = useNavigate();
  const [errorMessage, seterrorMessage] = useState("");
  let init = {
    email: "",
  };

  let submit = (value, { resetForm }) => {
    getAxios(value);
    resetForm(value);
  };

  let getAxios = async (value) => {
    try {
      let getUser = await axios({
        method: "post",
        url: "/api/forget",
        data: value,
      });
      if (getUser.data.status === "success") {
        seterrorMessage("Email Send Successfull");
        navi("/emailValidation");
      }
    } catch (error) {
      if (error.response.data.message) {
        seterrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div id="bg-color">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 mt-2">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <Link to="/">
                    <IoMdArrowRoundBack className="h1 display-4 text-danger" />
                  </Link>
                </div>
                <div>
                  <h1 className="text-center text-white-50">Forget Password</h1>
                </div>
                <div className=""></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6 mt-2">
              <p className="mt-2 text-start w-75 text-white-50">
                Enter the email address you used when you joined and we'll send
                you instruction to reset you password
              </p>
              <Formik initialValues={init} onSubmit={submit}>
                <Form>
                  {errorMessage === "Email Send Successfull" ||
                  errorMessage === "Please Provide a Valid Email Address" ? (
                    <p className=" dotWork">{errorMessage}</p>
                  ) : (
                    <p className="dot">.</p>
                  )}
                  <Field
                    type="text"
                    placeholder="✉️Enter Your Email..."
                    className="form-control mb-2"
                    name="email"
                    id="place"
                  />
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <button
                        className="btn btn-primary effectOne"
                        type="submit"
                      >
                        Confirm Your Email
                      </button>
                    </div>
                    <div>
                      <p className="h6 text-black">
                        You remember your password <span></span>
                        <Link className="remove" to="/">
                          Login
                        </Link>
                      </p>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forget;
