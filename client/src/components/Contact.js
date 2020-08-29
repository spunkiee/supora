import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import contactImage from "../assets/get-in.png";
import getInTouch from "../assets/contact.svg";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
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

export default function Contact() {
  const classes = useStyles();

  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    buttonText: "Submit",
  });

  const { buttonText, name, email, phone, interest } = formInputs;

  const handleChange = (evt) => {
    setFormInputs({
      ...formInputs,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (name && email && phone && interest) {
      setFormInputs({ ...formInputs, buttonText: "Submitting..." });

      axios
        .post("/contact-us", {
          name,
          email,
          phone,
          interest,
        })
        .then((res) => {
          setFormInputs({
            name: "",
            phone: "",
            email: "",
            interest: "",
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
      toast.error("All fields required");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-text">
            <div className="contact-text-heading">
              Let us know your requirements
            </div>
            <div className="contact-text-para">
              Need more information or have any questions? Let us know and our
              team will get in touch with you to help you with your requirement.
            </div>
          </div>
          <div className="contact-img">
            <img src={contactImage} alt="ContactImage" />
          </div>
        </div>
      </div>
      <div className="support-page">
        <div className="support-container">
          <div className="support-image">
            <img src={getInTouch} alt="support" />
          </div>
          <div className="support-form">
            <div className="support-form-heading">Get In Touch</div>
            <div className="support-form-fields">
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
                      name="phone"
                      label="Phone Number"
                      type="text"
                      onChange={handleChange}
                      value={phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      name="interest"
                      required
                      fullWidth
                      label="Area of Interest"
                      multiline
                      rows={3}
                      variant="outlined"
                      type="text"
                      onChange={handleChange}
                      value={interest}
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
