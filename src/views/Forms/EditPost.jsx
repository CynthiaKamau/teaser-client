import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";

// core components
import { TailSpin } from "react-loader-spinner";
import TextField from "@material-ui/core/TextField";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert2";
import { Button } from "@material-ui/core";
import { editPost } from "../../actions/posts";

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
  cardItem: {
    margin: 20,
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
};
const useStyles = makeStyles(styles);

const EditPost = (props) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [post, setPost] = useState("");
  const [error, setError] = useState("");
  const [showloader, setShowloader] = useState(false);
  const [id, setId] = React.useState("");
  const [user_id, setUserId] = React.useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/auth/login-page" />;
  }

  useEffect(() => {
    const str = window.location.pathname;
    const id = str.slice(17, 1000);
    setShowloader(true);

    axios
      .get(`/posts/${id}`)
      .then((response) => {
        setShowloader(false);
        if (response.success == false) {
          setError(response.data.message);
        } else {
          let post = response.data.message;
          setPost(post.data);
          setTitle(post.title);
          setBody(post.body);
          setId(post.id);
          setUserId(post.user_id);
        }
      })
      .catch((error) => {
        setShowloader(false);
        setError(error.message);
      });
  }, [currentUser]);

  const handleEditPost = e => {
    
      setShowloader(true)
      dispatch(editPost(id, title, body, user_id))
      .then((response) => {
        setShowloader(false);
        let message = response.payload.data;
        swal.fire({
            title: "Success",
            text: message,
            icon: "success",
            dangerMode: true
        });
      }).catch((error) => {
          console.log("error", error)
          setShowloader(false);
        swal.fire({
            title: "Error",
            text: "An error occured, please try again",
            icon: "error",
            dangerMode: true
        });
      })
  }


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={styles.cardTitleWhite}>Edit Post</h4>
            </CardHeader>
            {showloader ? (
              <TailSpin type="Puff" color="#00BFFF" height={100} width={100} style={{ textAlign: "center" }} />
            ) : error ? (
              <GridItem style={{ textAlign: "center", marginTop: 10 }}>
                <p> Post does not exisit!</p>
              </GridItem>
            ) : (
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12} className={styles.cardItem}>
                    <h5>Title</h5>
                    <TextField
                      id="title"
                      label="Title"
                      value={title}
                      multiline
                      fullWidth
                      onChange={(event) => setTitle(event.target.value) }
                      rows={2}
                      defaultValue="Default Value"
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12} className={styles.cardItem}>
                    <h5>Body</h5>
                    <TextField
                      id="body"
                      label="Body"
                      value={body}
                      multiline
                      fullWidth
                      rows={4}
                      onChange={(event) => setBody(event.target.value)}
                      defaultValue="Default Value"
                      variant="outlined"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            )}
            <CardFooter>
              <Button type="submit" variant="contained" color="primary" onClick={handleEditPost}>
                  Save
                </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default EditPost;
