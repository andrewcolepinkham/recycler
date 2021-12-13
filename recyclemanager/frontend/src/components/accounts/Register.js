import React, { Component } from 'react';
import { Link, Redirect, Input } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {register, getCommunities} from '../../actions/auth';
import {createMessage} from '../../actions/messages';
const reduxStateData = getCommunities()
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
    community: "",
    profile_photo:null,

  }; 

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    getCommunities : PropTypes.func.isRequired,
    createMessage  : PropTypes.func.isRequired, 
    
  };

  
  onImageChange = e => {
    console.log(e.target.files[0])
    if (e.target.files && e.target.files[0]) {
      // let img = event.target.files[0];
      console.log(e.target.files[0])
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
        profile_photo
      }
      this.props.register(newUser);
     
    } 
    

  }
 createSelectItems() {
    // console.log("Create select items")
    let items = []
    const communities = this.props.getCommunities();
    console.log("gotten communites in create")
    console.log("communities:"); 
    console.log(communities); 
    // console.log('type of communities:')
    // console.log(typeof communities)
    //let { communities } = this.props.getCommunities()
   // console.log(communities)

    // for (const element of this.props.getCommunities()) {
    //   console.log(element);
    //  }    
    // for (var i =0; i < communities.length; i++) {
    //   console.log(communites[i])
    // }
    for (let i = 0; i <= 10; i++) {             
         items.push({name : i, value : i});   
         //here I will be creating my options dynamically based on
         //what props are currently passed to the parent component
    }
    return items;
}  

onDropdownSelected(e) {
   console.log("THE VAL", e.target.value);
   //here you will see the current selected value of the select input
}

  onChange = e => {    
  this.setState({ [e.target.name]: e.target.value });}
  render() {
    if(this.props.isAuthenticated){
      return <Redirect to="/"/>;
    }
    const { username, email, password, password2, community, profile_photo } = this.state; 
    console.log(this.state)
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
            <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Change
        </Dropdown.Toggle>

        <Dropdown.Menu >
        {this.createSelectItems().map((item, index) => <Dropdown.Item value={item.value}>{item.name}</Dropdown.Item>
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

});

export default connect(mapStateToProps, {register, createMessage, getCommunities}) (Register);