import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {register} from '../../actions/auth';
import {createMessage} from '../../actions/messages';
export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "", 
    community: "",
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
    const { username, email, password, password2, community, profile_photo } = this.state;
    if(password !== password2) {
      this.props.createMessage({ passwordNotMatch: 'Passwords do not match!'})
    }
    else {
      const newUser = {
        username,
        password,
        email, 
        community,
        profile_photo
      }
      this.props.register(newUser);
      print("yuh")
      return <Redirect to="/account"/>
     
    } 
    

  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    if(this.props.isAuthenticated){
      return <Redirect to="/"/>;
    }
    const { username, email, password, password2, community, profile_photo } = this.state; 
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Team Name</label>
              <input 
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-group">
              <label>Community</label>
              <input 
                type="text"
                className="form-control"
                name="community"
                onChange={this.onChange}
                value={community}
              />
            </div>
            <div className="form-group">
              <label>Team Photo</label>
              <input className="form-control" type="file" accept="image/png, image/jpeg" name="myImage" onChange={this.onImageChange} />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
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

export default connect(mapStateToProps, {register, createMessage}) (Register);