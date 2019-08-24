import React, { Component } from 'react';
import axios from 'axios';
import DragAndDrop from "./DragAndDrop";
import ImageEditor from "./ImageEditor";
export default class ProjectViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedImage: null,
            images: [],
        }

        this.selectImage = this.selectImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.refreshImages = this.refreshImages.bind(this);
        this.refreshImages();
        
    }

    
    componentDidUpdate(prevProps, prevState) {

        let current_project = this.props.project_id
     
        if (prevProps && prevProps.project_id !== current_project) {
            this.refreshImages();
    
        }
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

    selectImage(index) {
    
        let image = this.state.images[index];
        this.setState({selectedImage:image});
    }

 

    refreshImages() {
      
        axios.post("http://localhost:3001/images/list", {
            data: {
                project_id: this.props.project_id
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

        if(!this.state.selectedImage) {
            let imgs = [];
            for (let i = 0; i < this.state.images.length; i++) {
        
                imgs.push(<img key={i} 
                            src={this.state.images[i].encoded_image}
                            name={this.state.images[i].name}
                            id={this.state.images[i].id}
                            onClick={() => this.selectImage(i)} 
                        />);
            }
            return(
                <div>
                
                    <DragAndDrop uploadImage={this.state.uploadImage}/>
                    <div id="grid">
                        {imgs}
                    </div>
                                
                </div>
            );
        }
        else {
            return(<ImageEditor image={this.state.selectedImage}/>);
        }
    }
}