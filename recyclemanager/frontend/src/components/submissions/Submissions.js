import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSubmissions, deleteSubmission } from "../../actions/submissions";
import Image from 'react-bootstrap/Image';

export class Submissions extends Component {
  static propTypes = {
    submissions: PropTypes.array.isRequired,
    getSubmissions: PropTypes.func.isRequired,
    deleteSubmission: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getSubmissions();
  }

  render() {
    return (
      <Fragment>
        <h2>Submisions</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Photo</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.submissions.map(submission => (
              <tr key={submission.id}>
                <td>{submission.id}</td>
                <td>{submission.amount}</td>
                <td>{submission.description} </td>
                <td>
                  <Image src={submission.photo}/>
                </td>
                {/* <Image src="recyclemanager/media/post_images/test.JPEG"/> */}
                {/* <td>{submission.photo}</td> */}
                <td>
                  <button
                    onClick={this.props.deleteSubmission.bind(this, submission.id)}
                    className="btn btn-danger btn-sm"
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  submissions: state.submissions.submissions,
});

export default connect(
  mapStateToProps,
  { getSubmissions, deleteSubmission }
)(Submissions);