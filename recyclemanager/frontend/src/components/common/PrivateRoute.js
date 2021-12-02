import React from 'react';
// REACT v6 Redirect is now Navigate

import {Routes, Route, Navigate } from "react-router-dom"; 
import { connect } from "react-redux"; 
import PropTypes from "prop-types"

const PrivateRoute=({component: Component, auth, ...rest}) => (
     <Route 
    {...rest}
    render={props => {
        if(auth.isLoading) {
            return <h2> Loading...</h2> //COULD PUT IT IN LOADER 

        }
        else if (!auth.isAuthenticated) {
            return <Navigate to ="./login" />
        }
        else {
        return <Component {...props} />
    }}}
    />
  
); 


const mapStateToProps = state => ({
    auth : state.auth
}); 

export default (PrivateRoute);