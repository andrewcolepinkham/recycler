import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadAccount, updateAccount } from "../../actions/auth";
import {createMessage} from '../../actions/messages';
import { Link, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";



export class EditProfile extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    loadAccount: PropTypes.func.isRequired
  };
  onImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      this.setState({
        profile_photo: e.target.files[0]
      });
    }
  };
 

componentDidMount() {
  this.props.loadAccount();
}
onChange = e =>  {
  this.setState({ [e.target.name]: e.target.value });
}

onSubmit = e => {
  e.preventDefault();
  const updateAcc= new FormData(); 
  const { username, email, password, password2, community, profile_photo } = this.state;
  
  
  updateAcc.append("username", this.state.username)
  updateAcc.append("password", this.state.password)
  updateAcc.append("email", this.state.email)
  updateAcc.append("community", this.state.community); 
  if (profile_photo == !'undefined'){

   
    console.log(profile_photo)

    updateAcc.append('profile_photo', profile_photo, profile_photo.name);
  }

  console.log(updateAcc); 
  this.props.updateAccount(updateAcc);
}

render() {
  const { isAuthenticated, account, username, email, password, password2, community, profile_photo } = this.props.auth;
  
  return (
    <div className="card card-body mt-4 mb-4">
      <h2>Edit Profile</h2>
      <div className="form group">
      <label >Team Name</label>
      <input
          type="text"
          name="username"
          className="form-control ml-auto"
          placeholder={account.username}
          value={username}
          onChange={this.onChange}
          
        />
   
        </div>
        <div className="form-group">
        <label>Email</label>
         <input
          type="text"
          name="email"
          className="form-control ml-auto "
          placeholder={account.email}

          onChange={this.onChange}
          value = {email}
        />
        </div>
        <div className="form-group">
        <label>Password</label>
         <input
          type="text"
          name="password"
          className="form-control ml-auto"

          onChange={this.onChange}
          placeholder="******"
        />
        </div>
        <label>Community</label>
        <input
          type="text"
          name="community"
          className="form-control ml-auto"
          placeholder={account.community}
          onChange={this.onChange}
          
        />
        <div className="form-group">
          <label>Team Photo</label>
          <input className="form-control" type="file" accept="image/png, image/jpeg" value = {profile_photo} name="profile_photo" onChange={this.onImageChange} />
        </div>
        <div className="form-group">
        <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
          Edit
        </button>
        </div>
        
      
        </div>
  );
}
}
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, {loadAccount, updateAccount})(EditProfile);