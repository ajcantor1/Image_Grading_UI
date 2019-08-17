import React, { Component } from 'react';
import axios from 'axios';
import Divider from  '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import './styles/dashboard.css';
import './styles/modal.css';
import CreateProjectModal from "./CreateProjectModal";
import ProjectViewer from "./ProjectViewer";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            show_create_project: false,
            projects: [],
            selectedProject: -1
        };

        this.showCreateProjectModal = this.showCreateProjectModal.bind(this);
        this.hideCreateProjectModal = this.hideCreateProjectModal.bind(this);
        this.refreshProjectList = this.refreshProjectList.bind(this);
        this.selectProject = this.selectProject.bind(this);
        this.isProjectSelected = this.isProjectSelected.bind(this);
        this.refreshProjectList();

    }

    selectProject(id){

        this.setState({
            selectedProject: id
        })
    }

    isProjectSelected(value) {
        
        if(this.state.selectedProject === value.name)
        {
            return 1;
        }
        else
        {
            return -1;
        }
    }

    refreshProjectList() {
        axios.post("http://localhost:3001/projects/list", {
            user: {
                user_id: this.props.params.user.id
            }
        }, {withCredentials: true})
            .then(response => {

                if (response.data.projects_available) {
                    this.setState({
                        projects: response.data.projects
                    });   
                }
         
            })
            .catch(error => {
                console.log("error", response)
            }) 
     
    }

    showCreateProjectModal() {
        this.setState({ show_create_project: true });
    }

    hideCreateProjectModal(save, project_name) {
        
        if(save) {
            const new_project_name = project_name;
            axios.post("http://localhost:3001/projects/create", {
                project: {
                    name: new_project_name,
                    user_id: this.props.params.user.id
                }
            }, {withCredentials: true})
            .then(response => {
                console.log("res: ", response);
                if(response.data.success)
                {
                    console.log(success);
                    this.refreshProjectList();
                  
                }
            })
            .catch(error => {
                console.log("registration error", error)
            });           
        }
        
        this.setState({ show_create_project: false })
    }

    render(){

        return (
            <div id="dashboard-container">
                <CreateProjectModal show={this.state.show_create_project} handleClose={this.hideCreateProjectModal}>
               
                </CreateProjectModal>
               
                <Paper
                    zdepth={1}
                    id="project-nav-container"
                    children= {
                        <div>
                            <center className="relative-avi-wrapper">
                            
                                <Paper className="avi-border"  />
                                <img src={require("./images/blank.jpg")} className="avatar" alt="avatar"/>
                            
                            </center>
                            <div className="relative-nav-wrapper">
                
                                <center>
                                <div>
                                    <p><span className="name">{this.props.params.user.first_name}</span></p>
                                </div>
                                <div>
                                    <p><span className="name">{this.props.params.user.last_name}</span></p>
                                </div>
                                </center>
                            
                                <button id="new-project" onClick={this.showCreateProjectModal}>
                                    <span id="plus-symbol">+</span> 
                                    Create New Project
                                </button>
                                <ul>
                                    {this.state.projects.map((value, index) => {
                                        let isSelected = "not";
                                        if(this.state.selectedProject === value.id) {
                                            isSelected = "selected";
                                        }
                                        
                    
                                        
                                        return <li  class={isSelected} onClick={() => this.selectProject(value.id)}  key={index}>{value.name}</li>
                                    })}
                                </ul>
                                <br/>
                                <Divider/>
                            </div>
                        </div>
                    }
                />  
               
                    <ProjectViewer project_id={this.state.selectedProject}/>
              
            </div>
        );
    }
}
