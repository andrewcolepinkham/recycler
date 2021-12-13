import axios from 'axios';
import { returnErrors } from './messages';

import {
  USER_LOADED,
  USER_LOADING,
  ACCOUNT_LOADED,
  ACCOUNT_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ACCOUNT_ERROR,
  GET_COMMUNITIES, 
  UPDATE_SUCCESS,
  ACCOUNT_REGISTER
} from './types';
export const getCommunities = () => (dispatch, getState) => {
  axios
  
    .get("/api/auth/communities", tokenConfig(getState))
    .then(res => {
      console.log("auth action get communities")
      console.log(res.data)
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
// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Get score
export const loadAccount = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: ACCOUNT_LOADING });

  axios
    .get('/api/auth/account', tokenConfig(getState))
    .then((res) => {
      console.log(" jodsno")
      console.log(res.data)
      dispatch({
        type: ACCOUNT_LOADED,
        payload: res.data,
      });
    })
    
    .catch((err) => {
      console.log(err)
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ACCOUNT_ERROR,
      });
    });
};
export const getMembership = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: MEMBERSHIP_INFO });

  
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post('/api/auth/login', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const register = ({ username, password, email,community, profile_photo }) => (dispatch) => {
  
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, email, password, community, profile_photo});
  console.log("profiles")
  console.log(body)
  axios
    .post('/api/auth/register', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })

    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const createAccount = ({ username, password, email, profile_photo }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, email, password });

  axios
    .post('/api/auth/register', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};
// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post('/api/auth/logout/', null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: 'CLEAR_LEADS' });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};

export const updateAccount = ({ username1, password, email, community, profile_photo }, username) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log("uPDAE")
  console.log(username)
  // Request Body
  const body = JSON.stringify({ username1, email, password, community });

  axios
    .patch('/api/auth/${username}', body, config)
    .then((res) => {
      console.log("!")

      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};