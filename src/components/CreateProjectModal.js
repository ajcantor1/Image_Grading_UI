import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

export default class CreateProjectModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            new_project_name: "",
            
     
        }

        this.handleChange = this.handleChange.bind(this);
      
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log("handle change", event);
    }

    render(){
        return (
            <div className={this.props.show ? "modal display-block" : "modal display-none"}>
              <Paper className="modal-main">
                <div class="label">New Project Name</div>
                <input class="text-box" name="new_project_name" type="text" onChange={this.handleChange}  value={this.state.new_project_name} />
                <div className=" new-project-buttons display-block">
                    <button  onClick={() => this.props.handleClose(true, this.state.new_project_name)}>Save</button>
                    <button  onClick={() => this.props.handleClose(false, this.state.new_project_name)}>close</button>
                </div>
              </Paper>
            </div>
          );       
    }
}

