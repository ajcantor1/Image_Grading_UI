import React, { Component } from 'react';
import axios from 'axios';
import Divider from  '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import './styles/dashboard.css';
import './styles/modal.css';
import CreateProjectModal from "./CreateProjectModal";
import DragAndDrop from "./DragAndDrop";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            show_create_project: false,
            projects: [],
            selectedProject: -1,
            images: [],
        };

        this.uploadImage = this.uploadImage.bind(this);

        this.showCreateProjectModal = this.showCreateProjectModal.bind(this);
        this.hideCreateProjectModal = this.hideCreateProjectModal.bind(this);
        this.refreshProjectList = this.refreshProjectList.bind(this);
        this.selectProject = this.selectProject.bind(this);
        this.isProjectSelected = this.isProjectSelected.bind(this);
        this.refreshImages = this.refreshImages.bind(this);

        this.refreshProjectList();

    }


    selectProject(id){

        this.setState({
            selectedProject: id
        });
        this.refreshImages(id);
        sessionStorage.setItem('project', id);
      
    }

    componentWillUnmount() {
        this.setState({
            selectedProject: -1
        });
    }

    componentDidMount() {

        try {
            let id = parseInt(sessionStorage.getItem('project'),10);
            this.setState({
                selectedProject: id
            });
            this.refreshImages();
        
        }catch(error) {

            this.setState({
                selectedProject: -1
            });            
        }

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

    uploadImage(file_name, encoding) {

        axios.post("http://localhost:3001/images/upload", { 
            data: {
                encoded_image: encoding,
                file_name: file_name,
                project_id: this.props.project_id
            }
        }, {withCredentials: true})
        .then(res => { 
            
            // then print response status
            //this.imageViewer.refreshImages();
            console.log("Image Sucessfully uploaded",res.statusText)
        })
        .catch(error => {
    
            console.log("Image failed to upload", error);
                
        }); 
    }
    refreshImages(id) {
        axios.post("http://localhost:3001/images/list", {
            data: {
                project_id: id
            }
        }, {withCredentials: true})
        .then(response => {
           
            if (response.data.images.length > 0) {
                this.setState({
                    images: response.data.images
                }); 

            }
            else {
                this.setState({
                    images: []
                });                  
            }
          
        })
        .catch(error => {
            console.log("error", error)
        });    
    }
    render(){
        let showProjectViewer = <div/>

        if (this.state.selectedProject != -1) {
            let imgs = [];
            for (var i = 0; i < this.state.images.length; i++) {
           
                imgs.push(<img key={i} src={this.state.images[i].encoded_image} />);
            }
            showProjectViewer = 
                <div>
                    <DragAndDrop uploadImage={this.uploadImage}/>
                    <div id="grid">
                        {imgs}
                    </div>
                </div>
        }

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
                     <div id="project-management">
                        {showProjectViewer}
                    </div>
            </div>
        );
    }
}
