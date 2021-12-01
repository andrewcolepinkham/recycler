import axios from "axios";

import { GET_SUBMISSIONS, DELETE_SUBMISSION, ADD_SUBMISSION } from "./types";

// GET SUBMISSIONS
export const getSubmissions = () => dispatch => {
  axios
    .get("/api/submissions/")
    .then(res => {
      dispatch({
        type: GET_SUBMISSIONS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// DELETE SUBMISSIONS
export const deleteSubmission = id => dispatch => {
  axios
    .delete(`/api/submissions/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_SUBMISSION,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD SUBMISSIONS
export const addSubmission = submission => dispatch => {
  axios
    .post("/api/submissions/", submission)
    .then(res => {
      dispatch({
        type: ADD_SUBMISSION,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};