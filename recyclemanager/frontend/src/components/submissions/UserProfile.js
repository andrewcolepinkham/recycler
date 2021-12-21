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
  }

  getDaysLeft() {
    let date = new Date().getDate()
    let year = new Date().getFullYear()
    let month = new Date().getMonth() 
    let daysInMonth = new Date(year, month, 0).getDate();
    let daysLeft = daysInMonth - date
    let percent = `${(date/daysInMonth)*100}%`
    return [daysLeft, percent]
  }
 
  render() {
    const { isAuthenticated, user, account, community} = this.props.auth;

    return (
      <div>
        <div className="card border-info card-body mt-4 mb-4" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <h1>Score</h1>
            <h1 className="card card-body text-white bg-info mb-3" >{account.score}</h1>
            <h5> {account.num_submissions} total submissions. Nice work!</h5>
            <Link to="/submissionform" className="nav-link">New Submission</Link> 
          </div>
          <div>
          
          <div className="progress" style={{height:"3px", marginTop: "20px", marginBottom: "20px"}}>
            <div className="progress-bar progress-bar-striped progress-bar-animated" 
              role="progressbar" 
              style={{width: this.getDaysLeft()[1]}} 
              aria-valuenow="10" 
              aria-valuemin="0" 
              aria-valuemax="100">
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
        }}>
            {this.getDaysLeft()[0]} days left to make additional submissions!
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {loadAccount})(UserProfile);