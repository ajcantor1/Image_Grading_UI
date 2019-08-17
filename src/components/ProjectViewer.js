import React, { Component } from 'react';

import axios from 'axios';
import Divider from  '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DragAndDrop from "./DragAndDrop";


export default class ProjectViewer extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            images: [],
            selectedImage: null
        };

        this.refreshImages = this.refreshImages.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }
S
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
            console.log("Image Sucessfully uploaded",res.statusText)
        })
        .catch(error => {
    
            console.log("Image failed to upload", error);
                
        });                
    }


    

    refreshImages() {
        axios.post("http://localhost:3001/images/list", {
            project: {
                project_id: this.props.project_id
            }
        }, {withCredentials: true})
            .then(response => {

                if (response.data.images_available) {
                    this.setState({
                        images: response.data.images
                    });   
                }
         
            })
            .catch(error => {
                console.log("error", response)
            }) 
     
    }
    render() {
        return (
            <div id="project-management"><DragAndDrop uploadImage={this.uploadImage}/></div>
        );
    }   
}