import axios from 'axios';
import { returnErrors } from './messages';

import {
  PLACES_SUCCESS,
  PLACES_FAIL,
} from './types';

// LOGIN USER
export const getPlaces = (lat, lng, radius, keyword) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ lat, lng, radius, keyword});

  axios
    .post('/api/places/', body, config)
    .then((res) => {
      dispatch({
        type: PLACES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: PLACES_FAIL,
      });
    });
};