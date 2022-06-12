import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { register } from "../../actions/auth";
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import {
  Checkbox,
  TextField,
  MenuItem,
  FormControlLabel,
  Grid,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { TailSpin } from "react-loader-spinner";
import swal from "sweetalert2";
import loginPageStyle from "assets/jss/material-dashboard-react/views/registerPageStyle.jsx";
const useStyles = makeStyles(loginPageStyle);

export default function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRoleId] = useState("");
  const [gender, setGender] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [county, setCounty] = useState("");
  const [sub_county, setSubCounty] = useState("");
  const [ward, setWard] = useState("");
  const [constituency, setConstituency] = useState("");
  const [landmark, setLandMark] = useState("");
  const [terms_and_conditions, setTermsAndConditions] = useState(0);
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [showloader, setShowloader] = useState(false);

  const roles = [
    { value: 1, label: "Admin" },
    { value: 2, label: "Owner" },
    { value: 3, label: "Supplier" },
  ];

  const genders = [
    { value: "FEMALE", label: "Female" },
    { value: "MALE", label: "Male" },
    { value: "TRANS-GENDER", label: "Transgender" },
  ];

  const handleRegister = (e) => {
    e.preventDefault();
    setShowloader(true);

    dispatch(
      register(
        first_name,
        middle_name,
        last_name,
        email,
        role_id,
        gender,
        phone_number,
        county,
        sub_county,
        ward,
        constituency,
        landmark,
        terms_and_conditions,
        password,
        password_confirmation
      )
    )
      .then((response) => {
        if (response.success === true) {
          setShowloader(false);
          swal
            .fire({
              title: "Success",
              text: response.message,
              icon: "success",
              dangerMode: true,
            })
            .then(() => history.push("/auth/login-page"));
        } else {
          setShowloader(false);
          swal.fire({
            title: "Error",
            text: "An error occured, please try again.",
            icon: "error",
            dangerMode: true,
          });
        }
      })
      .catch((err) => {
        setShowloader(false);
        swal.fire({
          title: "Error",
          text: "An error occured, please try again.",
          icon: "error",
          dangerMode: true,
        });
      });
  };

  return (
    <div className={classes.container}>
      <form>
        <Card>
          <CardHeader
            className={`${classes.cardHeader} ${classes.textCenter}`}
            color="primary"
          >
            <h4 className={classes.cardTitle}>Registration Page</h4>
            <div className={classes.socialLine}>
              {[
                "fa fa-facebook-square",
                "fa fa-twitter",
                "fa fa-google-plus",
              ].map((prop, key) => {
                return (
                  <Button
                    color="transparent"
                    justIcon
                    key={key}
                    className={classes.customButtonClass}
                  >
                    <i className={prop} />
                  </Button>
                );
              })}
            </div>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="first_name"
                  label="First Name"
                  type="text"
                  fullWidth
                  style={{ marginBottom: "15px" }}
                  value={first_name}
                  variant="outlined"
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="middle_name"
                  label="Middle Name"
                  type="text"
                  fullWidth
                  style={{ marginBottom: "15px" }}
                  value={middle_name}
                  variant="outlined"
                  onChange={(event) => {
                    setMiddleName(event.target.value);
                  }}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="last_name"
                  label="Last Name"
                  type="text"
                  fullWidth
                  style={{ marginBottom: "15px" }}
                  value={last_name}
                  variant="outlined"
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  style={{ marginBottom: "15px" }}
                  value={email}
                  variant="outlined"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  id="outlined-select-role"
                  select
                  fullWidth
                  variant="outlined"
                  label="Select"
                  value={role_id}
                  onChange={(event) => {
                    setRoleId(event.target.value);
                  }}
                  helperText="Please select your role"
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </GridItem>

              <GridItem xs={12} sm={6} md={6}>
              <TextField
                  id="outlined-select-gender"
                  select
                  fullWidth
                  variant="outlined"
                  label="Select"
                  value={gender}
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                  helperText="Please select your gender"
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="phone_number"
                  label="Phone Number"
                  type="number"
                  fullWidth
                  style={{ marginBottom: "15px" }}
                  value={phone_number}
                  variant="outlined"
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="county"
                  label="County"
                  type="text"
                  fullWidth
                  style={{ marginBottom: "15px" }}
                  value={county}
                  variant="outlined"
                  onChange={(event) => {
                    setCounty(event.target.value);
                  }}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="sub_county"
                  label="Sub County"
                  type="text"
                  fullWidth
                  style={{ marginBottom: "15px" }}
                  value={sub_county}
                  variant="outlined"
                  onChange={(event) => {
                    setSubCounty(event.target.value);
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="constituency"
                  label="Constituency"
                  type="text"
                  fullWidth
                  style={{ marginBottom: "15px" }}
                  value={constituency}
                  variant="outlined"
                  onChange={(event) => {
                    setConstituency(event.target.value);
                  }}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="ward"
                  label="Ward"
                  type="text"
                  fullWidth
                  style={{ marginBottom: "15px" }}
                  value={ward}
                  variant="outlined"
                  onChange={(event) => {
                    setWard(event.target.value);
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="landmark"
                  label="Landmark"
                  type="text"
                  fullWidth
                  style={{ marginBottom: "15px" }}
                  value={landmark}
                  variant="outlined"
                  onChange={(event) => {
                    setLandMark(event.target.value);
                  }}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  style={{ marginBottom: "15px" }}
                  value={password}
                  variant="outlined"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="password_confirmation"
                  label="Password Confirmation"
                  type="password"
                  fullWidth
                  style={{ marginBottom: "15px" }}
                  value={password_confirmation}
                  variant="outlined"
                  onChange={(event) => {
                    setPasswordConfirmation(event.target.value);
                  }}
                />
              </GridItem>
            </GridContainer>

            <Grid container justify="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
                    value={1}
                    onChange={(event) =>
                      setTermsAndConditions(event.target.checked)
                    }
                    name="terms_and_conditions"
                    color="primary"
                  />
                }
                label="I agree to the terms and conditions"
              />
            </Grid>
          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>
            {showloader === true ? (
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <TailSpin
                  type="Puff"
                  color="#29A15B"
                  height={100}
                  width={100}
                />
              </div>
            ) : (
              <Button
                type="submit"
                color="primary"
                // simple
                size="lg"
                block
                onClick={handleRegister}
              >
                REGISTER
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
