import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import signinImage from "../assets/signin.svg";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Footer from "./Footer";
import { authenticate, isAuth } from "../utils/helpers";

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

export default function SignIn({ history }) {
  const classes = useStyles();

  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const { buttonText, email, password } = formInputs;

  const handleChange = (evt) => {
    setFormInputs({
      ...formInputs,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (email && password) {
      setFormInputs({ ...formInputs, buttonText: "Submitting..." });

      axios
        .post("/signin", {
          email,
          password,
        })
        .then((res) => {
          console.log("SIGNED UP SUCCESS!!", res);

          authenticate(res, () => {
            setFormInputs({
              ...formInputs,
              name: "",
              email: "",
              password: "",
              buttonText: "Submitted",
            });
            // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
            isAuth() ? history.push("/dashboard") : history.push("/signin");
          });
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
      toast.error("All fields required");
    }
  };

  return (
    <>
      <div className="signup-page">
        <div className="signup-container">
          <div className="signup-image-container">
            <img src={signinImage} alt="Sign Up" />
          </div>
          <div className="signup-form-container">
            <ToastContainer />
            <div className="signup-form-heading">Welcome! Sign In</div>
            <div className="signup-form-fields">
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      fullWidth
                      label="Email Address"
                      name="email"
                      autoFocus
                      onChange={handleChange}
                      type="email"
                      value={email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      onChange={handleChange}
                      value={password}
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
                  id="add-issue-button"
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  {buttonText}
                </Button>
              </form>
              <Link to="/auth/password/forgot">
                <span className="forgot-password">Forgot Password</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
