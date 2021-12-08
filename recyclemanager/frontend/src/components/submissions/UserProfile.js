import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadAccount } from "../../actions/auth";

export class UserProfile extends Component {
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
        <div> Username: {user.username} </div>
        <div> Email: {user.email}  </div>
        <div> Score: {account.score}  </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

// export default connect(mapStateToProps, {login}) (Login)
export default connect(mapStateToProps, {loadAccount})(UserProfile);