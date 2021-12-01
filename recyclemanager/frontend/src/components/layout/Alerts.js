import React, {Component, Fragment} from 'react';
import {withAlerts} from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from "prop-types";




export class Alerts extends Component{
    static PropTypes ={
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(){
        const {error, alert, message} = this.props;
        if(error != prevProp.error){
            if(error.msg.amount){
                alert.error(`Amount: ${error.msg.amount.join()}`);
            } 
            if(error.msg.comment){
                alert.error(`Comment: ${error.msg.amount.join()}`);
            } 
            if(error.msg.photo){
                alert.error("Photo is Required");
            } 
        }
        if (message != prevProp.message){
            if (message.deleteSubmission){
                alert.success(message.deleteSubmission)
            }
            if (message.addSubmission){
                alert.success(message.addSubmission)
            }
        }
    }

    render(){
        return<Fragment/>
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.msg
})


export default connect(mapStateToProps)(withAlerts(Alert)); 