import axios from "axios";

import { GET_USERDATA, DELETE_USER, ADD_USER } from "./types";

// GET LEADS
export const getUserdata = () => dispatch => {
  axios
    .get("/api/userdata/")
    .then(res => {
      dispatch({
        type: GET_USERDATA,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// DELETE LEAD
export const deleteUser = id => dispatch => {
  axios
    .delete(`/api/userdata/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD LEAD
export const addUser = user => dispatch => {
  axios
    .post("/api/userdata/", user)
    .then(res => {
      dispatch({
        type: ADD_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};