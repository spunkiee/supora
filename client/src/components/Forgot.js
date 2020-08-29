import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./Footer";

const BTN_LABEL = "Request reset link";

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

export default function Forgot({ history }) {
  const classes = useStyles();

  const [values, setValues] = useState({
    email: "",
    buttonText: BTN_LABEL,
  });

  const { email, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    if (email) {
      setValues({ ...values, buttonText: "Submitting..." });
      axios
        .post("forgot-password", { email })
        .then((response) => {
          console.log("FORGOT PASSWORD SUCCESS", response);
          toast.success(response.data.message);
          setValues({ ...values, buttonText: BTN_LABEL });
        })
        .catch((error) => {
          console.log("FORGOT PASSWORD ERROR", error.response.data);
          toast.error(error.response.data.error);
          setValues({ ...values, buttonText: BTN_LABEL });
        });
    } else {
      toast.error("Email is required");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="forgot-container">
        <div className="forgot-heading">No Worries! You will be back!!</div>
        <div className="forgot-form">
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CssTextField
                  variant="outlined"
                  label="Email Address"
                  name="email"
                  autoFocus
                  fullWidth
                  onChange={handleChange("email")}
                  type="email"
                  value={email}
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
              onClick={clickSubmit}
              className={classes.submit}
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
