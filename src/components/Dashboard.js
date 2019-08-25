import React, { Component } from 'react';
import axios from 'axios';
import Divider from  '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import './styles/dashboard.css';
import './styles/modal.css';
import CreateProjectModal from "./CreateProjectModal";
import ProjectViewer from './ProjectViewer';


export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            show_create_project: false,
            projects: [],
            selectedProject: null
        };

        this.ProjectViewerRef = React.createRef();

        this.showCreateProjectModal = this.showCreateProjectModal.bind(this);
        this.hideCreateProjectModal = this.hideCreateProjectModal.bind(this);

        this.selectProject = this.selectProject.bind(this);
        this.refreshProjectList = this.refreshProjectList.bind(this);
        this.refreshProjectList();
    }

    componentDidMount(){
        
        try {
            
            let project_id = parseInt(sessionStorage.getItem('project'),10);
            this.setState({
                selectedProject: project_id
            });
            this.ProjectViewerRef.refreshImages(project_id);

        }catch(error) {

            this.setState({selectedProject: null}); 
        }
        
    }

    selectProject(id){

        this.setState({
            selectedProject: id,
        });
        
        sessionStorage.setItem('project', id); 
      
    }

    refreshProjectList() {
        axios.post("http://localhost:3001/projects/list", {
            user: {
                user_id: this.props.params.user.id
            }
        }, {withCredentials: true})
        .then(response => {

            
            this.setState({
                projects: response.data.projects
            });   
           
        
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
                            
                            </div>
                        </div>
                    }
                />
                <div id="project-management">
                    {this.state.selectedProject &&
                        <ProjectViewer 
                         ref={this.ProjectViewerRef}
                         project_id={this.state.selectedProject}
                        />
                    }
                </div>
            </div>
        );
    }
}
