import axios from 'axios';
import { returnErrors } from './messages';

import {
  GET_COMMUNITIES,
  GET_COMMUNITIES_ACCOUNTS, 
  GET_ERRORS
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
  export const getCommunitiesAccounts = (community) => (dispatch, getState) => {
    console.log("making /api/communities request")
    const body = JSON.stringify({ community });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(community)
    axios
      .get("/api/communities/get_accounts" + community)
      
      .then(res => {
        console.log("res.data")
        console.log(res.data)
        dispatch({
          type: GET_COMMUNITIES_ACCOUNTS,
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