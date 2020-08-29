import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import Button from "@material-ui/core/Button";
import Footer from "./Footer";

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    let token = match.params.token;

    if (token) {
      let { name } = jwt.decode(token);
      setValues((v) => ({ ...v, name, token }));
    }
  }, [match.params.token]);

  const { name, token } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/account-activation", { token })
      .then((response) => {
        console.log("ACCOUNT ACTIVATION", response);
        setValues({ ...values, show: false });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("ACCOUNT ACTIVATION ERROR", error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="activation-container">
        <div className="activation-heading">
          Hey {name}, Ready to activate your account?
        </div>
        <div className="activation-button">
          <Button
            style={{
              backgroundColor: "#003a78",
              padding: "10px 36px",
              color: "white",
              fontSize: "20px",
              fontWeight: "300",
            }}
            variant="contained"
            onClick={clickSubmit}
          >
            Activate Your Account
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Activate;
