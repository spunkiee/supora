import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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

export default function Reset({ match }) {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword1: "",
    newPassword2: "",
    buttonText: "Reset password",
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues((v) => ({ ...v, name, token }));
    }
  }, [match.params.token]);

  const { name, token, newPassword1, newPassword2, buttonText } = values;

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    if (newPassword1 && newPassword2) {
      if (newPassword1 === newPassword2) {
        setValues({ ...values, buttonText: "Submitting" });
        axios
          .post("/reset-password", {
            newPassword: newPassword1,
            resetPasswordLink: token,
          })
          .then((response) => {
            console.log("RESET PASSWORD SUCCESS", response);
            toast.success(response.data.message);
            setValues({ ...values, buttonText: "Done" });
          })
          .catch((error) => {
            console.log("RESET PASSWORD ERROR", error.response.data);
            toast.error(error.response.data.error);
            setValues({ ...values, buttonText: "Reset password" });
          });
      } else {
        toast.error("Password does not match");
      }
    } else {
      toast.error("All fields Required");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="reset-container">
        <div className="reset-heading">Hey {name}, Type your new password</div>
        <div className="reset-input-form">
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CssTextField
                  variant="outlined"
                  required
                  fullWidth
                  name="newPassword1"
                  label="New Password"
                  type="password"
                  onChange={handleChange}
                  value={newPassword1}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  variant="outlined"
                  required
                  fullWidth
                  name="newPassword2"
                  label="Confirm New Password"
                  onChange={handleChange}
                  value={newPassword2}
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
              onClick={clickSubmit}
            >
              {buttonText}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
