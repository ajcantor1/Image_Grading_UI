import React, { Component } from 'react';
import { relative } from 'path';

export default class ImageCanvas extends Component {
    
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();        
    }

    mousemove(e) {
        this.mouse_x = e.clientX-this.canvasx;
        this.mouse_y = e.clientY-this.canvasy;
 
        if(this.mouse_down) {

            this.context.beginPath();
            
            if(this.tool_type =='draw') {
                this.context.globalCompositeOperation = 'source-over';
                
                this.context.lineWidth = '10';
                
            } 
            else {
                this.context.globalCompositeOperation = 'destination-out';
                this.context.lineWidth = '10';
            }
            this.context.moveTo(this.prev_mouse_x,this.prev_mouse_y);
            this.context.lineTo(this.mouse_x,this.mouse_y);
            
            this.context.stroke();
        }
        this.prev_mouse_x = this.mouse_x;
        this.prev_mouse_y = this.mouse_y;  
    }

    mouseup(e) {
        this.mouse_down = false; 
    }

    mousedown(e) {

        this.prev_mouse_x = this.mouse_x = e.clientX-this.canvasx;
        this.prev_mouse_y = this.mouse_y = e.clientY-this.canvasy;
        this.mouse_down = true;  
    }

    componentDidMount(){
        this.mouse_x = 0;
        this.mouse_y = 0;

        this.prev_mouse_x = 0;
        this.prev_mouse_y = 0;

        this.mouse_down = false;

        this.tool_type = 'draw';

        this.mousemove = this.mousemove.bind(this);
        this.mousedown = this.mousedown.bind(this);
        this.mouseup = this.mouseup.bind(this);

        this.context = this.drawing_canvas.getContext('2d');
        this.context.globalAlpha = 0.8;
        
        this.context.strokeStyle = '#EE3417';
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';

        this.canvasx = this.drawing_canvas.getBoundingClientRect().left;
        this.canvasy = this.drawing_canvas.getBoundingClientRect().top;

        this.drawing_canvas.addEventListener('mousedown', this.mousedown);

        this.drawing_canvas.addEventListener('mouseup', this.mouseup);

        this.drawing_canvas.addEventListener('mousemove', this.mousemove);
    }

    render() {
        return(
            
            <div
                style={{
                    position: 'relative',
                    marginLeft: '30%',
                    marginTop: '5%',
                    width: '560px',
                    height: '560px'
                }} 
            >
                <canvas 
                    style = {{
                        position: 'absolute',
                        zIndex: 2
                    }}
                    height='560px' 
                    width='560px' 
                    ref={canvas => this.drawing_canvas = canvas}
                />
                <img style={{
                        height: '100%',
                        width: '100%'
                    }}
                    src={this.props.image.encoded_image}/>
            </div>
                
            );
    }
}