import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "../../actions/auth";
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { TextField } from "@material-ui/core";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { TailSpin } from "react-loader-spinner";
import swal from "sweetalert2";

import loginPageStyle from "assets/jss/material-dashboard-react/views/loginPageStyle.jsx";
const useStyles = makeStyles(loginPageStyle);

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showloader, setShowloader] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setShowloader(true);

    dispatch(login(email, password))
      .then((response) => {
        console.log("response", response)
        if (response.success === true) {
          history.push("/admin/dashboard");
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
        console.log("err", err);
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
      <GridContainer justify="center" alignItems='center'>
        <GridItem>
          <form>
            <Card>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="primary"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
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
                <p className={`${classes.textCenter} ${classes.checkboxLabel}`}>
                  Or Sign in with <strong>admin@material.com</strong> and the
                  password <strong>secret</strong>{" "}
                </p>

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
                    size="lg"
                    block
                    onClick={handleLogin}
                  >
                    LOGIN
                  </Button>
                )}
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
