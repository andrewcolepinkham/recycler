import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import {Container ,Row, Col} from "react-bootstrap"
import Image from 'react-bootstrap/Image'


export class Header extends Component {
  state = {
    showProfile: false
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
  alertInfo(){
    alert("Welcome to Recyler! This is an interactive reacyling competiton application that allows you submit recyling receipts to gain point. Compete with your friends by submitting reciepts on the submission tab and see your progress and others by using the dashboard tab. Also present is a map of nearby recyling centers, so get to work. May the best win!");
  };

  handleProfileOpen(){
    this.setState({
      showProfile: true
    })
  }

  handleProfileClose(){
    // console.log("HERE!!!")
    this.setState({
      showProfile: false
    })
  }

  handleLogout(){
    this.handleProfileClose()
    this.props.logout()
  }
  
  render() {
    const { isAuthenticated, user, account, community } = this.props.auth;
    const authLinks = (
      <>
        <Nav className="me-auto">
          <Link to="/submissionform" className="nav-link">New Submission</Link> 
          <Link to="/about" className="nav-link">About</Link> 
        </Nav>
        <Button variant="primary" onClick={this.handleProfileOpen.bind(this)}>
          {user ? `${user.username}` : 'Profile'}
        </Button>
        <Offcanvas show={this.state.showProfile} onHide={this.handleProfileClose.bind(this)} placement='end'>
          <Offcanvas.Header closeButton>
            <Col>
            <Offcanvas.Title>
              {user ? `Hi ${user.username}` : 'Profile'}
            </Offcanvas.Title>
            </Col>
            <Col>
              <Link to="/editer" onClick={this.handleProfileClose.bind(this)}className="nav-link">Edit Profile</Link>
            </Col>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Row className="card card-body bg-black mb-3">
              <legend>Account Info</legend> 
              <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
              }}>
                <Image src={account ? `${account.profile_photo}` :'profile_photo'} style={{ maxWidth: '10rem' }} roundedCircle />
              </div>
              <form>
                <fieldset> 
                  {/* <div className="form-group">
                    <label for="staticEmail" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-10">
                      <input type="text" readonly="" className="form-control-plaintext" id="staticEmail" value={account ? `${account.email}` : '---'}/>
                    </div>
                  </div> */}
                  <div className="form-group">
                    <label for="exampleInputEmail1" className="form-label mt-4">Email address</label>
                    <input type="email" readonly="" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={account ? `${account.email}` : '---'}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1" className="form-label mt-4">Score</label>
                    <input type="email" readonly="" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={account ? `${account.score}` : '---'}/>
                    <small id="emailHelp" className="form-text text-muted">Keep making submissions to rack up more points.</small>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1" className="form-label mt-4">Number of Submissions</label>
                    <input type="email" readonly="" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={account ? `${account.num_submissions}` : '---'}/>
                    <small id="emailHelp" className="form-text text-muted">There's still more time to recycle!</small>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1" className="form-label mt-4">Community</label>
                    <input type="email" readonly="" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={community ? `${community.name}` : '---'}/>
                    <small id="emailHelp" className="form-text text-muted">Compete against those in your community.</small>
                  </div>
                  {/* <div className="form-group row">
                    <label for="staticEmail" className="col-sm-3 col-form-label">Score</label>
                    <div className="col-sm-10">
                      <input type="text" readonly="" className="form-control-plaintext" id="staticEmail" value={account ? `${account.score}` : '---'}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="staticEmail" className="col-sm-5 col-form-label">Number of Submissions</label>
                    <div className="col-sm-10">
                      <input type="text" readonly="" className="form-control-plaintext" id="staticEmail" value={account ? `${account.num_submissions}` : '---'}/>
                    </div>
                  </div>   
                  <div className="form-group row">
                    <label for="staticEmail" className="col-sm-5 col-form-label">Community</label>
                    <div className="col-sm-10">
                      <input type="text" readonly="" className="form-control-plaintext" id="staticEmail" value={community ? `${community.name}` : '---'}/>
                    </div>
                  </div> */}
                </fieldset>
              </form>
              {/* <h5> Email: {account ? `${account.email}` : 'email'}</h5>
              <h5> Score: {account ? `${account.score}` : 'score'}</h5>
              <h5> Number of Submissions: {account ? `${account.num_submissions}` : 'Number of Submissions'}</h5>
              <h5> Community: {community ? `${community.name}` : 'Communities'}</h5> */}
            </Row>
            <Button variant="danger" onClick={this.handleLogout.bind(this)}>
              Logout
            </Button>
            

          </Offcanvas.Body>
        </Offcanvas>
      </>
    );

    const guestLinks = (
      <> 
        <Nav className="me-auto">
          <Link to="/login" className="nav-link"> Login </Link>
          <Link to="/register" className="nav-link"> Register </Link>
        </Nav>   
      </>
      
    );


    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
          <Navbar.Brand href="/#/profile">Recycler</Navbar.Brand>
          {isAuthenticated?authLinks:guestLinks}
          </Container>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Header);