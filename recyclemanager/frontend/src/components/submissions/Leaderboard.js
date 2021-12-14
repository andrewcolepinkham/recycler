import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCommunitiesAccounts } from "../../actions/communities";


export class Leaderboard extends Component {
    static propTypes = {
      
      accounts: PropTypes.object.isRequired,
      getCommunitiesAccounts : PropTypes.func.isRequired,
      communities: PropTypes.object.isRequired, 


    };


  componentDidMount() {
    this.props.getCommunitiesAccounts("West Chester"); 
   
  }

  render() {
    const {accounts} = this.props.communities
    console.log(accounts)
    return (

      <div  style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h2>Leaderboard</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Amount</th>
              <th />
            </tr>
          </thead>
         </table>
         <div>TO DO</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  communities : state.communities
  //accounts: state.accounts
});

export default connect(
  mapStateToProps, {getCommunitiesAccounts}
)(Leaderboard);