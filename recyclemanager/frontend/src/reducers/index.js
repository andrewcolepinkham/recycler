import { combineReducers } from "redux";
import submissions from "./submissions";
import errors from './errors';
import messages from "./messages";
import auth from "./auth"; 
import google from "./google";
import communities from "./communities";

export default combineReducers({
        submissions,
        errors,
        messages,  
        auth,
        google,
        communities
});