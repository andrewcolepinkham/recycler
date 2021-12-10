import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";




export class Header extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
  alertInfo(){
    alert("Welcome to Recyler! This is an interactive reacyling competiton application that allows you submit recyling receipts to gain point. Compete with your friends by submitting reciepts on the submission tab and see your progress and others by using the dashboard tab. Also present is a map of nearby recyling centers, so get to work. May the best win!");
  };
  
  render() {
    const { isAuthenticated, user, account } = this.props.auth;
    // console.log(user)
    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.username}` : ''}</strong>
        </span>
        <div className="navbar-nav justify-content-end">
<<<<<<< Updated upstream
          <Link to="/" className="nav-link">Profile</Link> 
          <Link to="/editer" className="nav-link">Edit Profile</Link>
          <Link to="/submissionform" className="nav-link">New Submission</Link> 
=======
          <Link to="/" className="nav-link">Profile</Link>
          <Link to="/submissionform" className="nav-link">New Submission</Link>
>>>>>>> Stashed changes
          <button variant="outline-light" onClick={this.alertInfo} className="nav-link btn  " >
            About
          </button>
          <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">
            Logout
          </button>
          </div>
                  
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0" >
        <li className="nav-item">
          <Link to="/register" className="nav-link"> Register </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link"> Login </Link>
        </li> 
      </ul>
    );


    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">.
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              Recycler
            </a>
          </div>
          {isAuthenticated?authLinks:guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Header);