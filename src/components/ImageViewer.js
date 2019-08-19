import React, { Component } from 'react';
import './styles/imageviewer.css';
import axios from 'axios';

export default class ImageViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
            display: <div/>,
            images: []
        }

        this.refreshImages = this.refreshImages.bind(this);
     
    }

    componentDidMount() {
        this.refreshImages();
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
          
        })
        .catch(error => {
            console.log("error", error)
        });    
    }

    render() {

        let imgs = [];
        for (var i = 0; i < this.state.images.length; i++) {
            console.log(this.state.images[i].encoded_image);
            imgs.push(<img src={"data:image/jpeg;base64,"+this.state.images[i].encoded_image} />);
        }
        return (
            <div class="grid">
                {imgs}
            </div>
        );

    }
}