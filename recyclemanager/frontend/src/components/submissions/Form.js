import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSubmission } from "../../actions/submissions";

export class Form extends Component {
  state = {
    amount: "",
    comment: "",
    photo: ""
  };

  static propTypes = {
    addSubmission: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { amount, comment, photo } = this.state;
    const userdata = { amount, comment, photo };
    this.props.addSubmission(submission);
    e.target.reset();
  };

  render() {
    const { amount, comment, photo } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Submission</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Amount</label>
            <input
              className="form-control"
              type="text"
              name="amount"
              onChange={this.onChange}
              value={amount}
            />
          </div>
          <div className="form-group">
            <label>Comment</label>
            <input
              className="form-control"
              type="text"
              name="comment"
              onChange={this.onChange}
              value={comment}
            />
          </div>
          <div className="form-group">
            <label>Photo</label>
            <textarea
              className="form-control"
              type="image"
              name="photo"
              onChange={this.onChange}
              value={photo}
            />
          </div>
          <div className="form-group">
            <button type="submit" disabled={this.state.amount.length<1}  className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addSubmission}
)(Form);