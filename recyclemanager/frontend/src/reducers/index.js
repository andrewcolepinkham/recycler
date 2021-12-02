import { combineReducers } from "redux";
import submissions from "./submissions";
import errors from './errors';
import messages from "./messages";
import auth from "./auth"; 

export default combineReducers({
        submissions,
        errors,
        messages,  
        auth
});