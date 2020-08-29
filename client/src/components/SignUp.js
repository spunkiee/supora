import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import signupImage from "../assets/signup.svg";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#41444b",
      fontWeight: "bold",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#BCBDC0",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fddb3a",
      },
    },
  },
})(TextField);

export default function SignUp() {
  const classes = useStyles();

  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    buttonText: "Submit",
  });

  const { buttonText, name, email, password, confirmPassword } = formInputs;

  const handleChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        setFormInputs({ ...formInputs, buttonText: "Submitting..." });

        axios
          .post("/signup", {
            name,
            email,
            password,
          })
          .then((res) => {
            console.log("SIGNED UP SUCCESS!!", res);
            setFormInputs({
              name: "",
              password: "",
              confirmPassword: "",
              email: "",
              buttonText: "Submit",
            });
            toast.success(res.data.message);
          })
          .catch((err) => {
            if (err && err.response && err.response.data) {
              toast.error(err.response.data.error);
            }
            setFormInputs({
              ...formInputs,
              buttonText: "Submit",
            });
          });
      } else {
        setFormInputs({
          ...formInputs,
          buttonText: "Submit",
        });
        toast.error("Password does not match!");
      }
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <>
      <div className="signup-page">
        <div className="signup-container">
          <div className="signup-image-container">
            <img src={signupImage} alt="Sign Up" />
          </div>
          <div className="signup-form-container">
            <ToastContainer />
            <div className="signup-form-heading signup-heading-media-query">
              Sign Up
            </div>
            <div className="signup-form-fields signup-fields-media-query">
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Full Name"
                      name="name"
                      type="text"
                      autoFocus
                      onChange={handleChange}
                      value={name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      onChange={handleChange}
                      value={password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      onChange={handleChange}
                      value={confirmPassword}
                    />
                  </Grid>
                </Grid>
                <Button
                  style={{
                    backgroundColor: "#003a78",
                    padding: "10px 36px",
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "300",
                  }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  {buttonText}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
