import React, { Component } from 'react';
import { Link, Redirect, Input } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {register} from '../../actions/auth';
import { getCommunities } from "../../actions/communities";
import {createMessage} from '../../actions/messages';
import Dropdown from 'react-bootstrap/Dropdown';


// mapping options
/**
 * enter keys (which you wan to render as title and value in dropdown list) as value in title and value
 */
const mappingOptions = { title: "diveType", value: "diveTypeID" };

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "", 
    community: "Select Community",
    profile_photo:null,
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    communities: PropTypes.object.isRequired,
    getCommunities : PropTypes.func.isRequired,
    createMessage  : PropTypes.func.isRequired, 
    
  };

  
  onImageChange = e => {
    // console.log(e.target.files[0])
    if (e.target.files && e.target.files[0]) {
      // let img = event.target.files[0];
      // console.log(e.target.files[0])
      this.setState({
        profile_photo: e.target.files[0].name
      });
    }
  };


  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2, community, profile_photo } = this.state;
    console.log(profile_photo)
    if(password !== password2) {
      this.props.createMessage({ passwordNotMatch: 'Passwords do not match!'})
    }
    else {
      const newUser = {
        username,
        password,
        email, 
        community,
        profile_photo,
      }
      this.props.register(newUser);
    }
  }
 createSelectItems() {
    const { communities } = this.props.communities;
    let items = []
    if (communities){
      for (let i = 0; i < communities.length; i++) {             
        items.push({name : communities[i].name, value : i});   
      }
      return items
    }
    else{
      items.push({name : 'loading...', value : 0});  
      return items
    }
}  

componentDidMount(){
  this.props.getCommunities();
}

  onChange = e => {    
  this.setState({ [e.target.name]: e.target.value });}
  render() {
    if(this.props.isAuthenticated){
      return <Redirect to="/"/>;
    }
    const handleSelect = (eventKey) => {
      this.setState({
        community: eventKey
      })
    }
    const {communities} = this.props.communities;
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
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {community}
              </Dropdown.Toggle>
              <Dropdown.Menu >
                {this.createSelectItems().map((item, index) => 
                  <Dropdown.Item 
                    eventKey={item.name} 
                    value={item.value}
                  >
                    {item.name}
                  </Dropdown.Item>
              )}
              </Dropdown.Menu>
            </Dropdown>
              {/* <label>Community</label>
              <input 
                type="text"
                className="form-control"
                name="community"
                onChange={this.onChange}
                value={community}
              /> */}
            </div>
            {/* <div className="form-group">
            <Input type="select" onChange={this.onDropdownSelected} name ="community" label="Multiple Select" multiple>
       {this.createSelectItems()}
  </Input>
     
    </div> */}
            <div className="form-group">
              <label>Profile Photo</label>
              <input className="form-control" type="file" accept="image/png, image/jpeg" name="profile_pic" onChange={this.onImageChange} />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
               Already have an Team? <Link to="/login">Login</Link> 
            </p>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({

  isAuthenticated: state.auth.isAuthenticated,
  communities: state.communities
});

export default connect(mapStateToProps, {register, createMessage, getCommunities}) (Register);