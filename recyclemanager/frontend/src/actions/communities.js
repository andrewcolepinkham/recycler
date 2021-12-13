import axios from 'axios';
import { returnErrors } from './messages';

import {
  GET_COMMUNITIES,
} from './types';

export const getCommunities = () => (dispatch, getState) => {
    // console.log("making /api/communities request")
    axios
      .get("/api/communities")
      .then(res => {
        // console.log("res.data:")
        // console.log(res.data)
        dispatch({
          type: GET_COMMUNITIES,
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