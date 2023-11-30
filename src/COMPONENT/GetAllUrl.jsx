import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../STYLE/getUrl.css";
import { IoCopyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { LiaAtomSolid } from "react-icons/lia";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const GetAllUrl = ({ cookies, fun }) => {
  const Navi = useNavigate();
  const [saveUrl, setsaveUrl] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/api",
    })
      .then((e) => {
        if (e.data.status === "oops!!") {
          return "error";
        } else {
          return e.data.data;
        }
      })
      .then((result) => {
        setsaveUrl(result);
      })
      .catch((error) => {
        alert("Error While Fetching Data");
      });
  }, []);

  const deleteAxios = async (id) => {
    try {
      await axios({
        method: "delete",
        url: `/api/${id}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const axiosGetUrl = async (id) => {
  //   try {
  //     let axiosGetReq = await axios({
  //       method: "get",
  //       url: `/api/getid/${id}`,
  //     });
  //     console.log(axiosGetReq.data.message);
  //     Navi("axiosGetReq.data.message");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
                <Link to="/Url">
                  <IoMdArrowRoundBack />
                </Link>
              </h1>
            </div>
            <div>{/* <h1 className="text-white">SIGN IN</h1> */}</div>
            <div>
              <h1 className="text-white">
                <LiaAtomSolid />
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {saveUrl === "error" ? (
            <h1 className="text-center mt-2">☹️THERE IS NO URL TO SHOW</h1>
          ) : (
            <>
              {saveUrl.map((result) => (
                <div className="col-sm-4 mt-3">
                  <div className="card p-3 mt-2" id="list-color">
                    <ul id="list-hide">
                      <li className="text-white-50">Click The Link Below 👇</li>
                      <li className="text-white h6" id="url-id">
                        <p id="url-id" className="text-white ">
                          <span className="text-primary" id="url-id"></span>
                          <a
                            className="text-white mt-2"
                            href={`/api/getid/${result.sUrl}`}
                            // onClick={() => axiosGetUrl(result.sUrl)}
                            id="ancor-tag"
                            target="_black"
                          >
                            /api/getid/${result.sUrl}
                          </a>
                          <abbr title="Copy The Url">
                            <p
                              className="d-inline"
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  `/api/getid/${result.sUrl}`
                                )
                              }
                            >
                              <IoCopyOutline className="ms-3" />
                            </p>
                          </abbr>
                        </p>
                      </li>
                      <li className="text-primary h6" id="text-url">
                        URL: {result.url}
                      </li>
                      <li>
                        <button
                          onClick={() => deleteAxios(result._id)}
                          className="btn btn-danger mt-1"
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GetAllUrl;
