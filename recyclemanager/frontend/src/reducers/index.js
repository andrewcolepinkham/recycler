import { combineReducers } from "redux";
import PropTypes from "prop-types";
import { getSubmissions } from "../actions/submissions";
//import submissions from "./submissions"; 
export default combineReducers(
   
   
        getSubmissions()
      
); 

