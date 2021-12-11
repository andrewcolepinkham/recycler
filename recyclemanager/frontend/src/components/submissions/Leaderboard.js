import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Leaderboard extends Component {
    static propTypes = {

    };


  componentDidMount() {
  }

  render() {
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
});

export default connect(
  mapStateToProps,
)(Leaderboard);