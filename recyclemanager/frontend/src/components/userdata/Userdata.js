import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserdatas, deleteLead } from "../../actions/userdata";

export class Userdata extends Component {
  static propTypes = {
    userdata: PropTypes.array.isRequired,
    getUserdatas: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getUserdatas();
  }

  render() {
    return (
      <Fragment>
        <h2>Userdata</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.userdata.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.message}</td>
                <td>
                  <button
                    onClick={this.props.deleteLead.bind(this, user.id)}
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
  userdata: state.userdata.userdata
});

export default connect(
  mapStateToProps,
  { getUserdata, deleteUser }
)(Userdata);