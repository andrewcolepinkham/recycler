import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadAccount } from "../../actions/auth";
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
      // let img = event.target.files[0];
      this.setState({
        photo: e.target.files[0]
      });
    }
  };
 

componentDidMount() {
  this.props.loadAccount();
}
onChange(e) {
  this.setState({ value: e.target.value });
}

onSubmit(){
  e.preventDefault();
  const { username, email, password, password2, community, profile_photo } = this.state;
  const updateAcc = {
    username,
    password,
    email, 
    community,
    profile_photo
  }
  this.props.updateAccount(updateAcc);
      return <Redirect to="/"/>
}

render() {
  const { isAuthenticated, account, username, email, password, password2, community, profile_photo } = this.props.auth;

  // console.log(account)
  return (
    <div className="card card-body mt-4 mb-4">
      <h2>Edit Profile</h2>
      <div className="form group">
      <label>Team Name</label>
        <input
          type="text"
          name="username"
          className="form-control ml-auto"
          value={account.username}
          onChange={this.onChange}
          placeholder={this.props.placeholder}
        />
        </div>
        <div className="form-group">
        <label>Email</label>
         <input
          type="text"
          name="email"
          className="form-control ml-auto "
          value={account.email}
          onChange={this.onChange}
          placeholder={this.props.placeholder}
        />
        </div>
        <div className="form-group">
        <label>Password</label>
         <input
          type="text"
          name="password"
          className="form-control ml-auto"
          value={account.password}
          onChange={this.onChange}
          placeholder="******"
        />
        </div>
        <label>Community</label>
        <input
          type="text"
          name="community"
          className="form-control ml-auto"
          value={account.username}
          onChange={this.onChange}
          placeholder={"Change to community"}
        />
        <div className="form-group">
          <label>Team Photo</label>
          <input className="form-control" type="file" accept="image/png, image/jpeg" name="myImage" onChange={this.onImageChange} />
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
  
  // export default connect(mapStateToProps, {login}) (Login)
  export default connect(mapStateToProps, {loadAccount})(EditProfile);