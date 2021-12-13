import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSubmissions, deleteSubmission } from "../../actions/submissions";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { loadAccount } from "../../actions/auth";

function MyVerticallyCenteredModal(props) {
  let {id, type, amount, description, photo} = "---";
  if (props.submission !== null){
    id = props.submission.id;
    type = props.submission.type;
    amount = props.submission.amount;
    description = props.submission.description;
    photo = props.submission.photo;
  } 
  return ( 
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {type}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>${amount}</h4>
        <h4>{description}</h4>
        <img src={photo} className='img-fluid hover-shadow' alt='' style={{ maxWidth: '20rem' }}/>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
  
}

export class Submissions extends Component {
  static propTypes = {
    submissions: PropTypes.array.isRequired,
    getSubmissions: PropTypes.func.isRequired,
    deleteSubmission: PropTypes.func.isRequired,
    loadAccount: PropTypes.func.isRequired
  };
  state = {
    imageModal: false,
    selectedSubmission: null
  }

  componentDidMount() {
    this.props.getSubmissions();
  }

  handleEnlargeImage(submission) {
    console.log("Here")
    this.setState({selectedSubmission: submission, imageModal: true, })
  }
  
  
  render() {
    
    return (
      <div className="card card-body mt-4 mb-4" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h2>My Submissions</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Photo</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.submissions.map(submission => (
              <tr key={submission.id} >
                <td onClick={this.handleEnlargeImage.bind(this, submission)} >{submission.id}</td>
                <td onClick={this.handleEnlargeImage.bind(this, submission)} >{submission.type}</td>
                <td onClick={this.handleEnlargeImage.bind(this, submission)} >{submission.amount}</td>
                <td onClick={this.handleEnlargeImage.bind(this, submission)} >{submission.description}</td>
                <td>
                  <img src={submission.photo} onClick={this.handleEnlargeImage.bind(this, submission)}className='img-fluid hover-shadow' alt='' style={{ maxWidth: '5rem' }}/>
                </td>
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
        <MyVerticallyCenteredModal
          show={this.state.imageModal}
          onHide={() => this.setState({imageModal: false})}
          submission={this.state.selectedSubmission}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  submissions: state.submissions.submissions,
});

export default connect(
  mapStateToProps,
  { getSubmissions, deleteSubmission, loadAccount}
)(Submissions);