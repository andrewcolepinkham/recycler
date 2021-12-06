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
      <Fragment>
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
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
)(Leaderboard);