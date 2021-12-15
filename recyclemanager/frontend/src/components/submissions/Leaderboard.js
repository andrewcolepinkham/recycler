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

    let sortAccounts = (accounts ? accounts.sort(function (a1 , a2){ return a2.score - a1.score}) : [])
    console.log("SORTED ACCOUNTS")
    console.log(sortAccounts)
    if (sortAccounts.length > 5){
      const size = 5
      const items = sortAccounts.slice(0, size)
      sortAccounts = items
    }
    if (sortAccounts.length < 5){
      const size = sortAccounts.length
      const maxSize = 5
      var count = 0
      let newArray = []
      while (count < size-1){
        newArray[count] = sortAccounts[count]
        count = count + 1
      } 
      while (count < maxSize){
        const account = {"account":"", "score": ""}
        newArray[count] = account
        count = count + 1
      }
      sortAccounts = newArray
    }
    console.log("ACCOUNNTTSSS")
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
            {/* PROBLEM IS HERE WHEN THIS IS ADDED IT CAUSES ARRAY OF ACCOUNTS TO GO NULL W
            WHEN GONE ARRAY IS POPULATED ----  ALSO HAVE TO THINK ABOUT WHAT TO DO IF LESS THAN 5 
            ACCOUNTS IN GIVEN COMMUNITY */}
            <tr>
              <td>1</td>
              <td>{accounts.map(item => {return <li>{accounts[0].username}</li>; })}</td>
              <td>{accounts.map(item => {return <li>{accounts[0].score}</li>; })}</td>
            </tr>
           <tr>
              <td>2</td>
              <td>{accounts.map(item => {return <li>{accounts[1].username}</li>; })}</td>
              <td>{accounts.map(item => {return <li>{accounts[1].score}</li>; })}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>{accounts.map(item => {return <li>{accounts[2].username}</li>; })}</td>
              <td>{accounts.map(item => {return <li>{accounts[2].score}</li>; })}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>{accounts.map(item => {return <li>{accounts[3].username}</li>; })}</td>
              <td>{accounts.map(item => {return <li>{accounts[3].score}</li>; })}</td>
            </tr>
            <tr>
              <td>5</td>
              <td>{accounts.map(item => {return <li>{accounts[4].username}</li>; })}</td>
              <td>{accounts.map(item => {return <li>{accounts[4].score}</li>; })}</td>
            </tr>
          </thead>
         </table>
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