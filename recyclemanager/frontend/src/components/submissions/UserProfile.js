import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadAccount } from "../../actions/auth";

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
      <Fragment>
        <h2>Profile</h2>
        <div>
          <img src={account.photo} style={{ maxWidth: '6rem' }}/>
        </div>        
        <h5>Team Name: {account.username}</h5>
        <h5> Email: {user.email}</h5>
        <h5> Score: {account.score}</h5>
        <h5> Number of Submissions: {account.num_submissions}</h5>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

// export default connect(mapStateToProps, {login}) (Login)
export default connect(mapStateToProps, {loadAccount})(UserProfile);