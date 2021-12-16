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
                    <input type="email" readonly="" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={account ? `${account.community}` : '---'}/>
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

        


      // <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      //   {/* <span className="navbar-text mr-3">
      //     <strong>{user ? `Welcome ${user.username}` : ''}</strong>
      //   </span> */}
      //   <div className="navbar-nav justify-content-end">
      //     <Link to="/" className="nav-link mr-3">{user ? `${user.username}` : ''}</Link> 
      //     <Link to="/editer" className="nav-link">Edit Profile</Link>
      //     <Link to="/submissionform" className="nav-link">New Submission</Link> 
      //     <Link to="/about" className="nav-link">About</Link> 
      //     {/* <button variant="outline-light" onClick={this.alertInfo} className="nav-link btn  " >
      //       About
      //     </button> */}
      //     <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">
      //       Logout
      //     </button>
      //     </div>
                  
      // </ul>
    );

    const guestLinks = (
      <> 
        <Nav className="me-auto">
          <Link to="/login" className="nav-link"> Login </Link>
          <Link to="/register" className="nav-link"> Register </Link>
        </Nav>   
      </>
      // <ul className="navbar-nav mr-auto mt-2 mt-lg-0" >
      //   <li className="nav-item">
      //     <Link to="/register" className="nav-link"> Register </Link>
      //   </li>
      //   <li className="nav-item">
      //     <Link to="/login" className="nav-link"> Login </Link>
      //   </li> 
      // </ul>
    );


    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
          <Navbar.Brand href="/#/profile">Recycler</Navbar.Brand>
          {isAuthenticated?authLinks:guestLinks}
          {/* <Nav className="me-auto">
            
          </Nav>
          <Button variant="primary" onClick={this.handleProfileOpen.bind(this)}>
          {user.username}
          </Button>
          <Offcanvas show={this.state.showProfile} onHide={this.handleProfileClose.bind(this)} placement='end'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              Some text as placeholder. In real life you can have the elements you
              have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
          </Offcanvas> */}
          {/* <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas> */}
          </Container>
        </Navbar>
      </>
      // <nav className="navbar navbar-expand-sm navbar-light bg-light">.
      //   <div className="container">
      //     <button
      //       className="navbar-toggler"
      //       type="button"
      //       data-toggle="collapse"
      //       data-target="#navbarTogglerDemo01"
      //       aria-controls="navbarTogglerDemo01"
      //       aria-expanded="false"
      //       aria-label="Toggle navigation"
      //     >
      //       <span className="navbar-toggler-icon" />
      //     </button>
      //     <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      //       <a className="navbar-brand" href="#">
      //         Recycler
      //       </a>
      //     </div>
      //     {isAuthenticated?authLinks:guestLinks}
      //   </div>
      // </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Header);