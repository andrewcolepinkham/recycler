import {GET_ERRORS, PLACES_FAIL} from '../actions/types';

const initialState = {
    msg: {},
    status: null
}

export default function(state = initialState, action){
    switch(action.type){
        case PLACES_FAIL:
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status
            };
            default:
                return state; 
    }
}