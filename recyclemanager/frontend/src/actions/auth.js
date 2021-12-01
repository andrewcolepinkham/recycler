import axios from 'axios'; 
import {returnErrors } from './messages'; 
import { USER_LOADED, USER_LOADING, AUTH_ERROR } from './types';





// CHECK TOKEN &  LOAD USER 
export const loadUser = () => (dispatch, getState)=> {
    //User loading 
    dispatch({type: USER_LOADING}); 

    //Get token from state 
    const token = getState().auth.token; 

    //headers 
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }


    //If token, add to headsers config 
    if(token){
        config.headers['Authorization']= 'Token ${token}'; 
    
    }
    axios.get('/api/auth/user', config).then(res=> {
        dispatch ({
            type: USER_LOADED, 
            payload: res.data
        }); 

    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.reponse.status)); 
        dispatch({
            type: AUTH_ERROR
        }

        ); 
    }); 
}; 