import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCommunitiesAccounts } from "../../actions/communities";


export class Leaderboard extends Component {
    static propTypes = {
      accounts: PropTypes.object.isRequired,
      getCommunitiesAccounts : PropTypes.func.isRequired,
      communities: PropTypes.object.isRequired, 
      auth: PropTypes.object.isRequired,
    };

  componentDidMount() {
    console.log("auth: ")
    console.log(this.props.auth.community.name)
    this.props.getCommunitiesAccounts(this.props.auth.community.name);
  }
  calculateWidth(topscore, score){
    if (score === 0){
      return "5%"
    }
    return `${(score / topscore) * 100}%`
  }

  render() {
    const {accounts} = this.props.communities
    return (
      
      <div className="card border-info card-body mt-6 mb-6" >
        <h2>Leaderboard</h2>
        <div>
          <div>
            <h5>{accounts ? accounts[0].username: "---"}</h5>
            <div class="progress" style={{height:"50px", marginBottom: "10px"}}>
              <div class="progress-bar progress-bar-striped progress-bar-animated" 
                role="progressbar" 
                style={{width: (accounts ? this.calculateWidth(accounts[0].score, accounts[0].score) : "0%" )}} 
                aria-valuenow="10" 
                aria-valuemin="0" 
                aria-valuemax="100">
                  {accounts ? accounts[0].score: "---"}pts
              </div>
            </div>
          </div>
          <div>
            <h5>{accounts ? accounts[1].username: "---"}</h5>
            <div class="progress" style={{height:"50px", marginBottom: "10px"}}>
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" 
                role="progressbar" 
                style={{width:(accounts ? this.calculateWidth(accounts[0].score, accounts[1].score) : "0%" )}} 
                aria-valuenow="25" 
                aria-valuemin="0" 
                aria-valuemax="100">
                  {accounts ? accounts[1].score: "---"}pts
              </div>
            </div>
          </div>
          <div>
            <h5>{accounts ? accounts[2].username: "---"}</h5>
            <div class="progress" style={{height:"50px", marginBottom: "10px"}}>
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" 
                role="progressbar" 
                style={{width:(accounts ? this.calculateWidth(accounts[0].score, accounts[2].score) : "0%" )}} 
                aria-valuenow="50" 
                aria-valuemin="0" 
                aria-valuemax="100">
                  {accounts ? accounts[2].score: "---"}pts
              </div>
            </div>
          </div>
          <div>
            <h5>{accounts ? accounts[3].username: "---"}</h5>
            <div class="progress" style={{height:"50px", marginBottom: "10px"}}>
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" 
                role="progressbar" 
                style={{width:(accounts ? this.calculateWidth(accounts[0].score, accounts[3].score) : "0%" )}} 
                aria-valuenow="75" 
                aria-valuemin="0" 
                aria-valuemax="100">
                  {accounts ? accounts[3].score: "---"}pts
              </div>
            </div>
          </div>
          <div>
            <h5>{accounts ? accounts[4].username: "---"}</h5>
            <div class="progress" style={{height:"50px", marginBottom: "10px"}}>
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" 
                role="progressbar" 
                style={{width:(accounts ? this.calculateWidth(accounts[0].score, accounts[4].score) : "0%" )}} 
                aria-valuenow="100" 
                aria-valuemin="0" 
                aria-valuemax="100">
                  {accounts ? accounts[4].score: "---"}pts
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  communities : state.communities,
  auth: state.auth
});

export default connect(
  mapStateToProps, {getCommunitiesAccounts}
)(Leaderboard);