import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { makeStyles } from "@material-ui/core/styles";
import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};
const useStyles = makeStyles(styles);

const ClientProfile = (props) => {
  const classes = useStyles();
  const [first_name, setFname] = useState("");
  const [middle_name, setMname] = useState("");
  const [last_name, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPNumber] = useState("");
  const [role, setRole] = useState("");
  const [county, setCounty] = useState("");
  const [sub_county, setSubCounty] = useState("");
  const [ward, setWard] = useState("");
  const [constitiuency, setConstituency] = useState("");
  const [landmark, setLandmark] = useState("");
  const [gender, setGender] = useState("");
  const [id, setId] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/auth/login-page" />;
  }

  useEffect(() => {
    setFname(currentUser.first_name);
    setMname(currentUser.middle_name);
    setLName(currentUser.last_name);
    setEmail(currentUser.email);
    setPNumber(currentUser.phone_number);
    setRole(currentUser.role.name);
    setCounty(currentUser.county);
    setSubCounty(currentUser.sub_county);
    setWard(currentUser.ward);
    setConstituency(currentUser.constituency);
    setLandmark(currentUser.landmark);
    setGender(currentUser.gender);
    setId(currentUser.id);
  }, [currentUser]);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="First Name"
                    id="first_name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: first_name,
                      name: first_name,
                      type: "text",
                      onchange: (event) => {
                        const value = event.target.value;
                        setFname(value);
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Middle Name"
                    id="middle_name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: middle_name,
                      name: middle_name,
                      type: "text",
                      onchange: (event) => {
                        const value = event.target.value;
                        setMname(value);
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Last Name"
                    id="last_name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: last_name,
                      name: last_name,
                      type: "text",
                      onchange: (event) => {
                        const value = event.target.value;
                        setLName(value);
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: email,
                      name: email,
                      type: "email",
                      onchange: (event) => {
                        const value = event.target.value;
                        setEmail(value);
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Phone Number"
                    id="phone_number"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: phone_number,
                      name: phone_number,
                      type: "number",
                      onchange: (event) => {
                        const value = event.target.value;
                        setPNumber(value);
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Role"
                    id="role"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: role,
                      disabled: true,
                      onchange: (event) => {
                        const value = event.target.value;
                        setRole(value);
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="County"
                    id="county"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: county,
                      onchange: (event) => {
                        const value = event.target.value;
                        setCounty(value);
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Sub-County"
                    id="sub_county"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: sub_county,
                      onchange: (event) => {
                        const value = event.target.value;
                        setSubCounty(value);
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Constituency"
                    id="constituency"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: constitiuency,
                      onchange: (event) => {
                        const value = event.target.value;
                        setConstituency(value);
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Ward"
                    id="ward"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: ward,
                      onchange: (event) => {
                        const value = event.target.value;
                        setWard(value);
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Landmark"
                    id="landmark"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: landmark,
                      onchange: (event) => {
                        const value = event.target.value;
                        setLandmark(value);
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Gender"
                    id="gender"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: gender,
                      onchange: (event) => {
                        const value = event.target.value;
                        setGender(value);
                      },
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              {/* <Button type="submit" color="primary" onClick={handleProfileUpdate}>
                  Update Profile
                </Button> */}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{role}</h6>
              <h4 className={classes.cardTitle}>
                {first_name} {last_name}
              </h4>
              <p className={classes.description}>
                Don't be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default withStyles(styles)(ClientProfile);
