import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSubmission } from "../../actions/submissions";
import Dropdown from 'react-bootstrap/Dropdown';


export class Form extends Component {
  state = {
    type: "Aluminium Cans",
    amount: "",
    description: "",
    photo: null, 
    unit: "Number of Objects"
  };

  static propTypes = {
    addSubmission: PropTypes.func.isRequired,
  };

  

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      // let img = event.target.files[0];
      this.setState({
        photo: event.target.files[0]
      });
    }
  };


  onSubmit = (e) => {
    e.preventDefault();
    const { type, description, amount, photo, unit } = this.state;
    // const myphoto = "recyclemanager/IMG_0283_Kj8kCCB.JPG"; //testing
    // const submission = { type, amount, description, photo };
    // const submission = { type, amount, description, photo };
    let submission = new FormData();
    submission.append('type', this.state.type);
    submission.append('description', this.state.description);
    submission.append('amount', this.state.amount);
    submission.append('photo', this.state.photo, this.state.photo.name);
    submission.append('unit',this.state.unit )
    this.props.addSubmission(submission);
    this.setState({
      type: "Aluminium Cans",
      amount: "",
      description: "",
      photo: null, 
      unit : 'Number of Objects'
    })
    e.target.reset();
    alert("Submission Sucessful")
  };

  render() {
    const { type, amount, description, photo, unit } = this.state;
    const handleTypeSelect = (eventKey) => {
      this.setState({
        type: eventKey
      })
    };
    const handleUnitSelect = (eventKey) => {
      this.setState({
        unit: eventKey
      })
    };
    
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Submission</h2>
        {/* <Image src={myimage}/> */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Type of Submission</label>
            <Dropdown onSelect={handleTypeSelect}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic"  >
                {this.state.type}
              </Dropdown.Toggle>
              <Dropdown.Menu  >
                <Dropdown.Item eventKey="Aluminium Cans">Aluminium Cans</Dropdown.Item>
                <Dropdown.Item eventKey="Mixed Recycling">Mixed Recyling</Dropdown.Item>
                <Dropdown.Item eventKey="Sorted Recycling">Sorted Recycling</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="form-group">
            <label>Amount Unit</label>
            <Dropdown onSelect={handleUnitSelect}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic"  >
                {this.state.unit}
              </Dropdown.Toggle>
              <Dropdown.Menu  >
                <Dropdown.Item eventKey="Number of Objects">Number of Objects</Dropdown.Item>
                <Dropdown.Item eventKey="Weight(lbs)">Weight(lbs)</Dropdown.Item>
                <Dropdown.Item eventKey="Money">Money</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              className="form-control"
              type="number"
              name="amount"
              onChange={this.onChange}
              value={amount}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              className="form-control"
              type="text"
              name="description"
              onChange={this.onChange}
              value={description}
            />
          </div>
          <div className="form-group">
            <label>Photo</label>
            <input className="form-control" type="file" accept="image/png, image/jpeg" name="myImage" onChange={this.onImageChange} required/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
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
  { addSubmission }
)(Form);