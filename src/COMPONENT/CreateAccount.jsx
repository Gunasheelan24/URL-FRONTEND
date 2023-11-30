import React from "react";
import "../Style/Signin.css";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import * as yup from "yup";
import "../Style/singup.css";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  let navi = useNavigate();
  let initialValue = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  let validate = yup.object({
    name: yup.string().required("REQUIRED"),
    email: yup.string().required("REQUIRED").email("EMAIL IS NOT VALID"),
    password: yup
      .string()
      .required("REQUIRED")
      .min(6, "YOUR PASSWORD IS WEAK")
      .max(13, ""),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  let onSubmit = (value, { resetForm }) => {
    Singup(value);
    resetForm(value);
  };

  let Singup = async (value) => {
    try {
      let signup = await axios({
        method: "post",
        url: "/api/signup",
        data: value,
      });
      alert("ACCOUNT CREATED");
      navi("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-color">
        <div className="container">
          <div className="row">
            <div className="col-sm-3 mt-5"></div>
            <div className="col-sm-6 mt-5">
              <div className="card bg-dark text-white p-2 mt-5">
                <h1 className="text-center">URL SHORTNER</h1>
                <div className="d-flex justify-content-evenly mt-4 ">
                  <h4 className="">
                    <Link
                      className="text-white"
                      style={{ textDecoration: "none" }}
                      to="/"
                    >
                      SIGN IN
                    </Link>
                  </h4>
                  <h4 className="border-bottom border-info border-3">
                    SIGN UP
                  </h4>
                </div>
                <div className="d-flex flex-column align-items-center mt-2 gap-5">
                  <Formik
                    initialValues={initialValue}
                    onSubmit={onSubmit}
                    validationSchema={validate}
                  >
                    {({ errors, touched }) => (
                      <Form className="d-flex flex-column gap-4">
                        <div className="d-flex gap-3 w-100">
                          <div className="">
                            <Field
                              type="text"
                              placeholder="fullName"
                              name="name"
                              className="form-control w-100 rounded-4"
                            />
                            {errors.name && touched.name ? (
                              <p className="error-inside-not">{errors.name}</p>
                            ) : (
                              <p className="error-inside">hi</p>
                            )}
                          </div>
                          <div className="">
                            <Field
                              type="text"
                              placeholder="email"
                              name="email"
                              className="form-control w-100 rounded-4"
                            />
                            {errors.email && touched.email ? (
                              <p className="error-inside-not">{errors.email}</p>
                            ) : (
                              <p className="error-inside">hi</p>
                            )}
                          </div>
                        </div>
                        <div className="">
                          <Field
                            type="text"
                            placeholder="Password"
                            error
                            name="password"
                            className="form-control w-100 rounded-4"
                          />
                          {errors.password && touched.password ? (
                            <p className="error-outside-not ">
                              {errors.password}
                            </p>
                          ) : (
                            <p className="error-outside text-dark">.</p>
                          )}
                          <Field
                            type="text"
                            placeholder="confirmPassword"
                            name="confirmpassword"
                            className="form-control w-100 rounded-4"
                          />
                          {errors.confirmpassword && touched.confirmpassword ? (
                            <p className="error-outside-not ">
                              {errors.confirmpassword}
                            </p>
                          ) : (
                            <p className="error-outside text-dark">.</p>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary w-100 rounded-4 mb-3"
                        >
                          SIGN UP
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>

            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
