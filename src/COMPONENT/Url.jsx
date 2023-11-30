import React, { useState } from "react";
import Header from "./Header";
import { FaThumbsUp } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { GrSecure } from "react-icons/gr";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LiaAtomSolid } from "react-icons/lia";

const Url = ({ setsaveToken, cookies, fun }) => {
  let startingValue = {
    url: "",
  };
  let getUrl = (url, { resetForm }) => {
    resetForm(url);
    axiosCall(url);
  };
  let validate = yup.object({
    url: yup
      .string()
      .required("Please Provide a Url")
      .min(6, "Url Length Is Too Small"),
  });
  const axiosCall = async (value) => {
    try {
      await axios({
        method: "Post",
        url: "/api/getUrl",
        data: value,
      });
      alert("Done");
    } catch (error) {
      console.log("Can't Add");
    }
  };
  return (
    <>
      <Header cookies={cookies} fun={fun} setsaveToken={setsaveToken} />
      <div className="container">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <h1 className="text-center fw-bold display-4 text-primary">
              Short URL
            </h1>
            <div className="card p-5 mt-2 border-5 rounded-5 shadow-lg">
              <Formik
                initialValues={startingValue}
                onSubmit={getUrl}
                validationSchema={validate}
              >
                <Form>
                  <h2 className="text-center fw-bold text-secondary-emphasis">
                    Paste the URL to be shortened
                  </h2>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Url"
                    name="url"
                  />
                  <div className="d-flex gap-2 align-items-center justify-content-between">
                    <button
                      type="submit"
                      className="btn btn-info mt-2 text-body-emphasis shadow-lg"
                    >
                      SHORTEN URL
                    </button>
                    <h6 className="text-danger  mt-3">
                      <ErrorMessage name="url" />
                    </h6>
                    <Link to="/ShowUrl" className="btn btn-primary">
                      SHOW My URL
                    </Link>
                  </div>
                </Form>
              </Formik>
              <p className="mt-2 text-center text-dark h6">
                ShortURL is a free tool to shorten URLs and generate short links
                URL shortener allows to create a shortened link making it easy
                to share
              </p>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
        <div className="row mt-4">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <h2 className="fw-bold text-start">
              Simple and fast URL shortener!
            </h2>
            <h6>
              ShortURL allows to shorten long links from Instagram,
              <span className="text-danger">
                Facebook, YouTube, Twitter, Linked In, WhatsApp{" "}
              </span>
              and sites. Just paste the long URL and click the Shorten URL
              button. On the next page, copy the shortened URL and share it on
              sites, chat and emails
            </h6>
          </div>
          <div className="col-sm-1"></div>
        </div>
        <div className="row mt-4">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 d-flex gap-3">
            <div className="">
              <h1 className="text-center w-100">
                <span>
                  <FaThumbsUp />
                </span>
                <h6 className="w-100 mt-2">
                  ShortURL is easy and fast, enter the long link to get your
                  shortened link
                </h6>
              </h1>
            </div>
            <div className="">
              <h1 className="text-center w-100">
                <span>
                  <FiLink />
                </span>
                <h6 className="w-100 mt-2">
                  Use any link, no matter what size, ShortURL always shortens
                </h6>
              </h1>
            </div>
            <div className="">
              <h1 className="text-center w-100">
                <span>
                  <GrSecure />
                </span>
                <h6 className="w-100 mt-2">
                  It is fast and secure, our service has HTTPS protocol and data
                  encryption
                </h6>
              </h1>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-sm-12 bg-secondary">
            <h2 className="text-white p-3 text-center">
              All Copyright © Resereved 2023
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Url;
