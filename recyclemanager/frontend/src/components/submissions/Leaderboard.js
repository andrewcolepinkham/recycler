import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Image from 'react-bootstrap/Image';

export class Leaderboard extends Component {
  static propTypes = {
    submissions: PropTypes.array.isRequired,
    getSubmissions: PropTypes.func.isRequired,
    deleteSubmission: PropTypes.func.isRequired
  };

  render() {
    return (
    
    <Fragment>
        <h2>Submisions</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Score</th>
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
  {}
)(Leaderboard);