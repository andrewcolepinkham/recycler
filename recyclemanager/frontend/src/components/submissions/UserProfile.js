import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadAccount } from "../../actions/auth";
import { Link } from "react-router-dom";

export class UserProfile extends Component {
    state = {
    }

    static propTypes = {
      auth: PropTypes.object.isRequired,

      loadAccount: PropTypes.func.isRequired
    };
   

  componentDidMount() {
    this.props.loadAccount();
  }
 
  render() {
    const { isAuthenticated, user, account } = this.props.auth;

    // console.log(account)
    return (
      <div className="card card-body mt-4 mb-4" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <h1>Score</h1>
        <h1 className="card card-body text-white bg-info mb-3" >{account.score}</h1>
        <h5> {account.num_submissions} total submissions. Nice work!</h5>
        <Link to="/submissionform" className="nav-link">New Submission</Link> 
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

// export default connect(mapStateToProps, {login}) (Login)
export default connect(mapStateToProps, {loadAccount})(UserProfile);