import React, { Component } from 'react';
import './styles/draganddrop.css';

export default class DragAndDrop extends Component {
    
   
    constructor(props) {
        super(props);
        this.dropRef = React.createRef();
        this.uploadImage = this.props.uploadImage.bind(this);
        this.state = {
     
            dragging : false,
            dragCounter : 0
        }
        
        this.handleDragIn = this.handleDragIn.bind(this);
        this.handleDragOut = this.handleDragOut.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        
    }

    handleDrag(event){
        
        event.preventDefault();
        event.stopPropagation();
    }  

    handleDragIn(event){

        event.preventDefault();
        event.stopPropagation();
        
        let increment = this.state.dragCounter + 1;
        this.setState({
            dragCounter: increment
        });

        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            
            this.setState({dragging: true});
        }
    }

    handleDragOut(event){

        event.preventDefault();
        event.stopPropagation();

        let decrement = this.state.dragCounter - 1;
        this.setState({
            dragCounter: decrement
        });
        if (this.state.dragCounter > 0) {
            return
        }
        this.setState({dragging: false})
    }

    handleDrop(event){

        event.preventDefault();
        event.stopPropagation();

        this.setState({dragging: false});
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
          
           
            let files = event.dataTransfer.files;
            
            for(let i=0; i<files.length; i++) {
                let reader = new FileReader();
                
                reader.onloadend = () => {
                    
                    let file_base64 = reader.result;                   
                    this.props.uploadImage(files[i].name,file_base64);
                };
                reader.onerror = function (error) {
                
                };

                reader.readAsDataURL(files[i]);
            }
        }
         
    }

    componentDidMount() {

        let div = this.dropRef.current;
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }  
    
    componentWillUnmount() {
        
        let div = this.dropRef.current;
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }

    render() {
        return (
          <div
            style={{
                height: '100%'
            }}
            ref={this.dropRef}
          >              
                <section className="lower-opacity" id="image-upload-section">
                    <div className="lower-opacity" id="image-upload-section-inner">
                        <img  src={require("./images/photos.png")}/>
                    </div>
                </section>
          </div>
        );
    }
    
}