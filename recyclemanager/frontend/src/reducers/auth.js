import {USER_LOADED, MEMBERSHIP_INFO,GET_COMMUNITIES, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, ACCOUNT_LOADED, ACCOUNT_LOADING, ADD_SCORE, UPDATE_SUCCESS} from "../actions/types"; 

const initialState = {
    token: localStorage.getItem('token'), 
    isAuthenticated: null, 
    isLoading: false, 
    user: null,
    community:null, 
    account: {
        score: "--",
        num_submissions: "--", 
        profile_photo:null, 
        community:null, 
    },
}; 

export default function(state=initialState, action){
    
    switch(action.type){
        case ACCOUNT_LOADING:
        case USER_LOADING: 
            return {
                ...state, 
                isLoading: true
            }; 
        case USER_LOADED: 
            return {
                ...state, 
                isAuthenticated: true,  
                isLoading: false, 
                user: action.payload,
            }; 
        case ACCOUNT_LOADED: 
           
            return {
                ...state, 
                isAuthenticated: true,  
                isLoading: false, 
                account: action.payload,

            }; 
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state, 
                ...action.payload,
                isAuthenticated: true,  
                isLoading: false, 
            }; 
      
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token'); 
            return {
                ...state,
                token: null, 
                user:null,
                isAuthenticated:false, 
                isLoading:false
            };
        case UPDATE_SUCCESS: 
            return  {...state,
            }

        default: 
            return state;

    }

}


