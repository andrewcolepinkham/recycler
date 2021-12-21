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
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';


export class Footer extends Component {
  state = {
    showProfile: false
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, user, account, community } = this.props.auth;
    const authComponents = (
        <MDBFooter bgColor='light' className='text-center text-lg-left'>
            {/* <MDBContainer className=' p-4'>
                <MDBRow>
                    <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
                    <h5 className='text-uppercase'>What's Recycler?</h5>

                    <p>
                        This is an interactive recycling competiton application that allows you submit recyling receipts and accumulate points.
                        Compete with your friends by submitting reciepts on the submission tab and view progress by using the dashboard tab.
                    </p>
                    </MDBCol>

                    <MDBCol bgColor='light'lg='6' md='12' className='mb-4 mb-md-0'>
                    <h5 className='text-uppercase'>How can I join?</h5>

                    <p>
                       Register with a team and join your local community. Then get recycling! Keep track of your recycling drops by submitting a recipt. Your score will be calculated and you're off to the races. Good Luck!
                    </p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer> */}
        </MDBFooter>
    );

    const guestComponents = (
        <MDBFooter bgColor='jjj' className='text-center text-lg-left'>
            <MDBContainer className=' p-4'>
                <MDBRow>
                    <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
                        <div class="card border-info mb-3" >
                            <div className="card-header">What's Recycler?</div>
                            <div className="card-body">
                                <h4 className="card-title">What's Recycler?</h4>
                                <p className="card-text">This is an interactive recycling competiton application that allows you submit recyling receipts and accumulate points.
                                Compete with your friends by submitting reciepts on the submission tab and view progress by using the dashboard tab.</p>
                            </div>
                        </div>
                    </MDBCol>

                    <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
                        <div className="card border-info mb-3" >
                            <div className="card-header">How can I join?</div>
                            <div className="card-body">
                                <h4 className="card-title">How can I join?</h4>
                                <p className="card-text">Register with a team and join your local community. Then get recycling! Keep track of your recycling drops by submitting a recipt. Your score will be calculated and you're off to the races. Good Luck!</p>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </MDBFooter>
    );


    return ( 
        <div style={{position:"relative", padding: "100px 100px 0px 100px", bottom:0, left:0, right:0}}>
            {isAuthenticated?authComponents:guestComponents}
            <MDBFooter style={{position:"fixed", bottom:0, left:0, right:0}} bgColor='light' className='text-center text-lg-left'>
                <div className='text-center p-3' style={{backgroundColor: 'rgba(153,51,204, 0.2)' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a className='text-dark' href='https://www.coloradocollege.edu/'>
                    ColoradoCollege.edu
                </a>
                </div>
            </MDBFooter>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Footer);