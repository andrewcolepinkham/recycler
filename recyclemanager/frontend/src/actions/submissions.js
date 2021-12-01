import axios from "axios";
import { createMessage } from "./messages";
import { GET_SUBMISSIONS, DELETE_SUBMISSION, ADD_SUBMISSION, GET_ERRORS, GET_MESSAGES } from "./types";

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
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      }
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

// DELETE SUBMISSIONS
export const deleteSubmission = id => dispatch => {
  axios
    .delete(`/api/submissions/${id}/`)
    .then(res => {
      dispatch(createMessage({deleteSubmission: "Submission Deleted"}));
      dispatch({
        type: DELETE_SUBMISSION,
        payload: id
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      }
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

// ADD SUBMISSIONS
export const addSubmission = submission => dispatch => {
  axios
    .post("/api/submissions/", submission)
    .then(res => {
      dispatch(createMessage({addSubmission: "Submission Added"}));
      dispatch({
        type: ADD_SUBMISSION,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      }
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};