import React, { Component } from 'react';

import axios from 'axios';
import Divider from  '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DragAndDrop from "./DragAndDrop";
import ImageViewer from "./ImageViewer";

export default class ProjectViewer extends Component {
    constructor(props) {
        super(props);

        this.imageViewer = React.createRef();

        this.uploadImage = this.uploadImage.bind(this);
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
            console.log("Image Sucessfully uploaded",res.statusText)
        })
        .catch(error => {
    
            console.log("Image failed to upload", error);
                
        }); 
        
     
    }

    render() {
        return (
            <div>
                <DragAndDrop uploadImage={this.uploadImage}/>
                <ImageViewer ref={this.imageViewer} project_id={this.props.project_id}/>
            </div>
        );
    }   
}