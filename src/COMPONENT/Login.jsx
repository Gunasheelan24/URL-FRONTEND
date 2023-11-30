import React, { useState } from "react";
import "../Style/Signin.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

const Login = () => {
  const navi = useNavigate();
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  let initialValue = {
    email: "",
    password: "",
  };

  let handleSubmit = (data, { resetForm }) => {
    signInCall(data);
    resetForm(data);
  };

  let validation = yup.object({
    email: yup
      .string()
      .required("Please Enter Your UserName")
      .email("Email Is Not Valid"),
    password: yup
      .string()
      .required("Please Enter Your Password")
      .min(6, "Password Must Have 7 Digits")
      .max(12, "Password Is Too Long"),
  });

  let signInCall = async (data) => {
    try {
      let signIn = await axios({
        method: "post",
        url: "/api/signin",
        data,
      });
      window.location.reload(true);
    } catch (err) {
      if (err.response.data.message === "Please Check You Password") {
        setpassword(err.response.data.message);
        password("");
        email("");
      } else if (err.response.data.message === "Please Check Your Email") {
        setemail(err.response.data.message);
        password("");
        email("");
      } else {
        console.log(err);
        password("");
        email("");
      }
    }
  };
  return (
    <>
      <div className="bg-color">
        <div className="container">
          <div className="row">
            <div className="col-sm-3 mt-5"></div>
            <div className="col-sm-6 mt-5">
              <div className="card bg-dark text-white p-2 mt-5 shadow-lg">
                <Formik
                  initialValues={initialValue}
                  onSubmit={handleSubmit}
                  validationSchema={validation}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <h1 className="text-center">URL SHORTNER</h1>
                      <div className="d-flex justify-content-evenly mt-4 ">
                        <h4 className="border-bottom border-warning border-3">
                          SIGN IN
                        </h4>
                        <h4>
                          <Link to="/signup" className="text-white" id="signin">
                            SIGN UP
                          </Link>
                        </h4>
                      </div>
                      <div className="d-flex flex-column align-items-center mt-2 gap-3">
                        <Field
                          type="text"
                          placeholder="Username"
                          className="form-control w-75 rounded-4"
                          name="email"
                        />
                        <div className="w-75">
                          {!errors.email && !touched.email && email !== "" ? (
                            <p className="error-email text-warning">{email}</p>
                          ) : (
                            <>
                              {errors.email && touched.email ? (
                                <p className="error-email text-warning">
                                  ⚡{errors.email}
                                </p>
                              ) : (
                                <p className="error-email text-dark ">.</p>
                              )}
                            </>
                          )}
                        </div>

                        <Field
                          type="text"
                          placeholder="Password"
                          className="form-control w-75 rounded-4"
                          name="password"
                        />
                        <div className="text-start w-75">
                          {!errors.password &&
                          !touched.password &&
                          password !== "" ? (
                            <p className="error-email text-warning ">
                              {password}
                            </p>
                          ) : (
                            <>
                              {errors.password && touched.password ? (
                                <p className="error-email text-warning ">
                                  ⚡{errors.password}
                                </p>
                              ) : (
                                <p className="error-email text-dark ">.</p>
                              )}
                            </>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="effect btn btn-warning w-75 rounded-4 mb-1"
                        >
                          SIGN IN
                        </button>
                        <Link className="forgetPassword" to="/forget">
                          <p className="text-white hovereffect">
                            Forget Password?
                          </p>
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
