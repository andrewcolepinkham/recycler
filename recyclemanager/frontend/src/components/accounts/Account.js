import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {register} from '../../actions/auth';
import {createMessage} from '../../actions/messages';
export class Account extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "", 
    profile_photo:""
  }; 

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  onImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      // let img = event.target.files[0];
      this.setState({
        photo: e.target.files[0]
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2, profile_photo } = this.state;
    if(password !== password2) {
      this.props.createMessage({ passwordNotMatch: 'Passwords do not match!'})
    }
    else {
      const newUser = {
        username,
        password,
        email, 
        profile_photo
      }
      console.log("made it here")
     
    } 
    

  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    if(this.props.isAuthenticated){
      return <Redirect to="/"/>;
    }
    const { username, email, password, password2, profile_photo } = this.state; 
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Create Profile </h2>
          <form onSubmit={this.onSubmit}>
             
            <div className="form-group">
              <label>Photo</label>
              <input className="form-control" type="file" accept="image/png, image/jpeg" name="myImage" onChange={this.onImageChange} />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Finish!
              </button>
            </div>
          
            <p>
               Already have an account? <Link to="/login">Login</Link> 
            </p>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({

  isAuthenticated: state.auth.isAuthenticated,

});

export default connect(mapStateToProps, {register, createMessage}) (Account);