import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCommunities, loadAccount, getMembership } from "../../actions/auth";

export class UserProfile extends Component {
    state = {
    }

    static propTypes = {
      auth: PropTypes.object.isRequired,

      loadAccount: PropTypes.func.isRequired, 
      getCommunities: PropTypes.func.isRequired
    };
   

  componentDidMount() {
    this.props.loadAccount()
    //this.props.getMembership()
   // this.props.getCommunities() 
    
  }
 
  render() {
    const { isAuthenticated, user, account, community} = this.props.auth;
  
    return (
      <Fragment>
        <h2>Profile</h2>
        <div>
        <img src={account.profile_photo} className='img-fluid hover-shadow' alt=''style={{ maxWidth: '5rem' }}/>
        </div>
        <h5>Team Name: {account.username}</h5>
        <h5> Email: {user.email}</h5>
        <h5> Score: {account.score}</h5>
        <h5> Number of Submissions: {account.num_submissions}</h5>
        <h5> Communities: {community.name}</h5>

        
        </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

// export default connect(mapStateToProps, {login}) (Login)
export default connect(mapStateToProps, {loadAccount, getMembership})(UserProfile);