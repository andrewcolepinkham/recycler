import React, { Component } from "react";
import { connect } from "react-redux";


export class About extends Component {

  static propTypes = {
  };

  render() {
    return (
        <div className="card card-body mt-4 mb-4">
            <h2>Recycling Challenge</h2>
            <div className="form-group">
                <h5>Welcome to Recyler!</h5> 
                <h6>This is an interactive recycling competiton application 
                    that allows you submit recyling receipts and accumulate points. </h6> 
                <h6>Compete with your friends by submitting reciepts on the 
                    submission tab and view progress by using 
                    the dashboard tab. </h6>   
                <h6>Also present is a map of nearby recyling centers, 
                    so get to work. May the most enviornmentally friendly win!</h6>    
            </div>
        </div>
        
    );
  }
}

export default connect()(About);