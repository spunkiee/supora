import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import supportImage from "../assets/support.svg";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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

const CssInputField = withStyles({
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
})(FormControl);

export default function SignUp() {
  const classes = useStyles();

  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    buttonText: "Submit",
  });

  const { buttonText, name, email, title, description, category } = formInputs;

  const handleChange = (evt) => {
    setFormInputs({
      ...formInputs,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (name && email && title && description && category) {
      setFormInputs({ ...formInputs, buttonText: "Submitting..." });

      axios
        .post("/add-ticket", {
          name,
          email,
          title,
          description,
          category,
        })
        .then((res) => {
          setFormInputs({
            name: "",
            title: "",
            email: "",
            category: "",
            description: "",
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
      <div className="support-page">
        <div className="support-container">
          <div className="support-image">
            <img src={supportImage} alt="support" />
          </div>
          <div className="support-form">
            <div className="support-form-heading">Ask Your Query Here</div>
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
                    <CssInputField variant="outlined" fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        label="Category"
                        onChange={handleChange}
                        value={category}
                        name="category"
                      >
                        <MenuItem value="Your Orders">Your Orders</MenuItem>
                        <MenuItem value="Return and Refunds">
                          Return and Refunds
                        </MenuItem>
                        <MenuItem value="Payment">Payment</MenuItem>
                        <MenuItem value="Account Issue">Account Issue</MenuItem>
                      </Select>
                    </CssInputField>
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      name="title"
                      label="Title"
                      type="text"
                      onChange={handleChange}
                      value={title}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      name="description"
                      required
                      fullWidth
                      label="Description"
                      multiline
                      rows={4}
                      variant="outlined"
                      type="text"
                      onChange={handleChange}
                      value={description}
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
