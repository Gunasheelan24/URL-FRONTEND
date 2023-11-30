import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../STYLE/forget.css";
import { Link, useNavigate } from "react-router-dom";

const Email = () => {
  let navi = useNavigate();
  let init = {
    otp: "",
    password: "",
    confirmpassword: "",
  };
  let submit = (value, { resetForm }) => {
    axiosCall(value);
    resetForm({ value: "" });
  };
  let axiosCall = async (value) => {
    try {
      let dqata = await axios({
        method: "patch",
        url: "/api/resetPassword",
        data: {
          value,
        },
      });
      console.log(dqata);
      navi("/");
    } catch (error) {
      console.log(error);
    }
  };
  let validate = yup.object({
    otp: yup.number("OTP MUST BE A NUMBER").required("REQUIRED"),
    password: yup.string().required("REQUIRED"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  return (
    <div id="bg-two-color">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 mt-2">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Link to="/forget">
                  <IoMdArrowRoundBack className="h1 display-4 text-danger" />
                </Link>
              </div>
              <div>
                <h1 className="text-center text-white-50">
                  EMAIL VERIFICATION
                </h1>
              </div>
              <div className=""></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6 mt-2">
            <div className="card rounded-bottom-5 rounded-top-5 bg-transparent p-5 border-info shadow-lg">
              <h3 className="text-center text-primary">Get Your Code</h3>
              <p className="h6 text-center text-warning">
                Please Enter The 4 Digit code that send to your email
              </p>
              <Formik
                initialValues={init}
                onSubmit={submit}
                validationSchema={validate}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="w-100">
                      <div className="d-flex gap-3">
                        <div className="">
                          <Field
                            type="text"
                            placeholder="NewPassword"
                            className="form-control w-100 mb-2"
                            name="password"
                            id="place"
                          />
                          {errors.password && touched.password ? (
                            <p className="password-hide">{errors.password}</p>
                          ) : (
                            <p className="password-hide-one">.</p>
                          )}
                        </div>
                        <div className="">
                          <Field
                            type="text"
                            placeholder="confirmpassword"
                            className="form-control w-100 mb-2"
                            name="confirmpassword"
                            id="place"
                          />
                          {errors.confirmpassword && touched.confirmpassword ? (
                            <p className="password-hide">
                              {errors.confirmpassword}
                            </p>
                          ) : (
                            <p className="password-hide-one">.</p>
                          )}
                        </div>
                      </div>
                      <Field
                        type="number"
                        placeholder="Enter Your Otp Here"
                        className="form-control w-100 h-100 mb-2"
                        name="otp"
                        id="place"
                      />
                      {errors.otp && touched.otp ? (
                        <p className="doteddd">{errors.otp}</p>
                      ) : (
                        <p className="doteddddd">.</p>
                      )}
                    </div>
                    <div className="d-flex justify-content-between">
                      <button
                        type="submit"
                        className="btn btn-dark text-capitalizet"
                      >
                        VERIFY AND PROCEED
                      </button>
                      <button className="btn btn-warning">RESEND CODE</button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;
