import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import { getPosts } from "../../actions/posts";
import { makeStyles } from "@material-ui/core/styles";

// core components
import { useHistory } from "react-router-dom";

import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import {
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  TextField,
} from "@material-ui/core";
import { TailSpin } from "react-loader-spinner";
import moment from "moment";
import swal from "sweetalert2";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlineOutlined,
  AddCircleOutlineOutlined,
} from "@material-ui/icons";
import { addPost } from "../../actions/posts";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};
const useStyles = makeStyles(styles);

function clientsList(props) {
  const { classes } = useStyles;
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { posts, posts_loading } = useSelector((state) => state.post);
  const [delete_open, setDeleteOpen] = useState(false);
  const [save_open, setSaveOpen] = useState(false);
  const [selected_id, setSelectedId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user_id, setUserId] = useState(currentUser.id);
  const [showloader, setShowloader] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  let history = useHistory();

  const handleClickOpenDelete = () => {
    setDeleteOpen(true);
  };

  const handleClickCloseDelete = () => {
    setDeleteOpen(false);
  };

  const handleClickOpenSave = () => {
    setSaveOpen(true);
  };

  const handleClickCloseSave = () => {
    setSaveOpen(false);
  };

  const handleSave = () => {
    setSaveOpen(false);
    setShowloader(true);
    dispatch(addPost(title, body, user_id))
      .then((response) => {
        setShowloader(false);
        console.log("res", response.payload.message)
        let message = response.payload.message;
        swal.fire({
          title: "Success",
          text: message,
          icon: "success",
          dangerMode: true,
        }).then(() => dispatch(getPosts()));
      })
      .catch((error) => {
        console.log("error", error);
        setShowloader(false);
        swal.fire({
          title: "Error",
          text: "An error occured, please try again",
          icon: "error",
          dangerMode: true,
        });
      });
  };

  const handleDelete = (e) => {
    axios
      .delete(`/posts/delete/${selected_id}`)
      .then((response) => {
        console.log(response.data);
        let message = response.data.message;
        setDeleteOpen(false);
        swal
          .fire({
            title: "Success",
            text: message,
            icon: "success",
            dangerMode: true,
          })
          .then(() => {
            dispatch(getPosts);
          });
      })
      .catch((error) => {
        setDeleteOpen(false);
        swal.fire({
          title: "Error",
          text: "An error occured, please try again.",
          icon: "error",
          dangerMode: true,
        });
      });
  };

  return (
    <div>
      {posts_loading ? (
        <TailSpin type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <GridContainer>
          <Card plain>
            <CardHeader plain color="primary">
              <h4>Posts</h4>
            </CardHeader>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={{ margin: "20px 0 20px" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpenSave}
              >
                Add New Post{" "}
              </Button>
            </Grid>
            <CardBody>
              <Grid container spacing={3}>
                {posts && posts.length > 0 ? (
                  posts.map((item) => {
                    return (
                      // <Grid container>
                      <Grid item xs={12} sm={4} md={4}>
                        <Card className="card" key={item.id}>
                          <CardHeader color="primary">
                            {" "}
                            {item.title}{" "}
                          </CardHeader>
                          <CardBody center>
                            <p> {item.body}</p>
                            <p>
                              {" "}
                              <strong>Created By : </strong>{" "}
                              {item.user.first_name} {item.user.last_name}
                            </p>
                            <p>
                              {" "}
                              <strong>Created At : </strong>{" "}
                              {moment(item.created_at).format("YYYY/MM/DD")}
                            </p>
                          </CardBody>
                          <CardActions disableSpacing>
                            <IconButton aria-label="share">
                              <AddCircleOutlineOutlined
                                style={{ color: "black" }}
                                onClick={() =>
                                  history.push(`/admin/post/${item.id}`)
                                }
                              />
                            </IconButton>
                            <IconButton aria-label="share">
                              <EditOutlined
                                style={{ color: "black" }}
                                onClick={() =>
                                  history.push(`/admin/edit-post/${item.id}`)
                                }
                              />
                            </IconButton>
                            <IconButton
                              aria-label="share"
                              onClick={() => {
                                handleClickOpenDelete();
                                setSelectedId(item.id);
                              }}
                            >
                              <DeleteOutlineOutlined
                                style={{ color: "black" }}
                              />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid>
                      // </Grid>
                    );
                  })
                ) : (
                  <p>No data available</p>
                )}
              </Grid>
            </CardBody>
          </Card>

          {/* create dialog */}
          <Dialog
            open={save_open}
            onClose={handleClickOpenSave}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Post</DialogTitle>
            <DialogContent>
              <DialogContentText>Create new post</DialogContentText>
              <TextField
                id="title"
                autoFocus
                margin="dense"
                label="Title"
                value={title}
                multiline
                fullWidth
                rows={2}
                onChange={(event) => setTitle(event.target.value)}
                defaultValue="Default Value"
                variant="outlined"
                style={{ marginBottom: "10px" }}
              />
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
            </DialogContent>
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
              <DialogActions>
                <Button
                  variant="outlined"
                  onClick={handleClickCloseSave}
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button variant="outlined" onClick={handleSave} color="primary">
                  Save
                </Button>
              </DialogActions>
            )}
          </Dialog>

          {/* delete dialog */}
          <Dialog
            open={delete_open}
            onClose={handleClickCloseDelete}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this post?.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={handleClickCloseDelete}
                color="secondary"
              >
                Cancel
              </Button>
              <Button variant="outlined" onClick={handleDelete} color="primary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </GridContainer>
      )}
    </div>
  );
}

export default withStyles(styles)(clientsList);
