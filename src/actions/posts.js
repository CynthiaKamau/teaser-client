import axios from "axios";
import { tokenConfig } from "./auth";
import {
  POSTS_SUCCESS,
  POSTS_FAIL,
  POSTS_FETCH_REQUEST,
  POST_SUCCESS,
  POST_FAIL,
  POST_FETCH_REQUEST,
  POST_ADD_SUCCESS,
  POST_ADD_FAIL,
  POST_ADD_FETCH_REQUEST,
  POST_EDIT_SUCCESS,
  POST_EDIT_FAIL,
  POST_EDIT_FETCH_REQUEST,
} from "../actions/types";

// get posts
export const getPosts = () => {
  return function(dispatch) {
    dispatch({
      type: POSTS_FETCH_REQUEST,
    });

    axios
      .get("/posts")
      .then((res) => dispatch({ type: POSTS_SUCCESS, payload: res.data }))
      .catch((error) => dispatch({ type: POSTS_FAIL, payload: error }));
  };
};

//edit specific post
export const getPost = (id) => {
  return function(dispatch) {
    dispatch({
      type: POST_FETCH_REQUEST,
    });

    axios
      .put(`/post/${id}`)
      .then((res) => dispatch({ type: POST_SUCCESS, payload: res.data }))
      .catch((error) => dispatch({ type: POST_FAIL, payload: error }));
  };
};

//add post
export const addPost = (body, title, user_id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const content = JSON.stringify({ body, title, user_id });

  return function(dispatch) {
    dispatch({
      type: POST_ADD_FETCH_REQUEST,
    });

    return axios
      .post("/posts/create", content, config)
      .then(
        (respose) =>
          dispatch({ type: POST_ADD_SUCCESS, payload: respose.data }),
        (error) => dispatch({ type: POST_ADD_FAIL, payload: error })
      );
  };
};

//edit post
export const editPost = (id, title, body, user_id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const content = JSON.stringify({ id, title, body, user_id });

  return function(dispatch) {
    dispatch({
      type: POST_EDIT_FETCH_REQUEST,
    });

    return axios
      .put(`/posts/edit`, content, config)
      .then(
        (respose) =>
          dispatch({ type: POST_EDIT_SUCCESS, payload: respose.data }),
        (error) => dispatch({ type: POST_EDIT_FAIL, payload: error })
      );
  };
};
