import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCommunities, loadAccount, getMembership } from "../../actions/auth";
import { Link } from "react-router-dom";

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
      // <Fragment>
      //   <h2>Profile</h2>
      //   <div>
      //   <img src={account.profile_photo} className='img-fluid hover-shadow' alt=''style={{ maxWidth: '5rem' }}/>
      //   </div>
      //   <h5>Team Name: {account.username}</h5>
      //   <h5> Email: {user.email}</h5>
      //   <h5> Score: {account.score}</h5>
      //   <h5> Number of Submissions: {account.num_submissions}</h5>
      //   <h5> Communities: {community.name}</h5>

        
      //   </Fragment>
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