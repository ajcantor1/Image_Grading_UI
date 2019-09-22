import React, { Component } from 'react';
import axios from 'axios';
import ImageCanvas from './ImageCanvas';

import { Icon } from 'react-icons-kit';
import { magicWand } from 'react-icons-kit/icomoon/magicWand';
import {bucket} from 'react-icons-kit/entypo/bucket';
import {paintBrush} from 'react-icons-kit/fa/paintBrush';
import {eraser} from 'react-icons-kit/fa/eraser'
import {undo} from 'react-icons-kit/iconic/undo'


export default class ImageEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toolSelected: null,
            brushSize: 5,
            tolerance: 30,
        }
        
        this.toolClicked = this.toolClicked.bind(this);
        this.numericValueUpdate = this.numericValueUpdate.bind(this);
     
        this.undo = this.undo.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log("handle change", event);
    }

    undo(){

    }

    toolClicked(toolname){
        
        if (toolname === 'brush' || toolname === 'eraser' || 
            toolname === 'bucket' || toolname === 'magicWand') {
            
            this.setState({
                toolSelected: toolname
            });

        } else if(toolname === 'undo') {
            this.undo();
        }

        
        
        console.log("handle click", toolname);
    }

    numericValueUpdate(value) {

        if(this.state.toolSelected === 'brush' || this.state.toolSelected === 'eraser'){
            if((value == -1 && this.state.brushSize > 1) || (value == 1 && this.state.brushSize < 500)) {
                const newValue = this.state.brushSize + value;
               
                this.setState({        
                    brushSize: newValue   
                });
            }
        } 
        else if(this.state.toolSelected === 'magicWand' || this.state.toolSelected === 'bucket'){
            if((value == -1 && this.state.tolerance > 1) || (value == 1 && this.state.tolerance < 500)) {
                const newValue = this.state.tolerance + value;

                this.setState({        
                    tolerance: newValue   
                });
            }           
        }
    }


    render() {

        let numericBoxEnabled = false;

        if (this.state.toolSelected === 'brush'     || 
            this.state.toolSelected === 'bucket'    || 
            this.state.toolSelected === 'magicWand' || 
            this.state.toolSelected === 'eraser') {
                numericBoxEnabled = true;
        }
        return(
            <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100%',
                    width: '100%'
                }}>
                <div id="image-tools-section">
                    <a class='circle-button undo-btn' onClick={() => this.toolClicked('undo')}>
                        <div class='circle-button-icon'>
                            <Icon size="30"
                                icon={undo}
                                name='undo' 
                                color='white'                                   
                            />
                        </div>  
                    </a>
                    <a onChange={this.handleChange} class={this.state.toolSelected === 'brush' ? 'circle-button tool-selected' :  'circle-button'} onClick={() => this.toolClicked('brush')}>
                        <div class='circle-button-icon'>
                            <Icon size="30"
                                icon={paintBrush} 
                                
                                color='white'    
                            />
                        </div>  
                    </a>
                    <a class={this.state.toolSelected === 'eraser' ? 'circle-button tool-selected' :  'circle-button'}  onClick={() => this.toolClicked('eraser')}>
                        <div class='circle-button-icon'>
                            <Icon size="30"
                                icon={eraser} 
                                name='eraser'
                                color='white'  
                            />
                        </div>
                    </a>
                    <a class={this.state.toolSelected === 'magicWand' ? 'circle-button tool-selected' :  'circle-button'} onClick={() => this.toolClicked('magicWand')}>
                        <div class='circle-button-icon'>
                            <Icon size="30"
                                icon={magicWand} 
                                name='magicWand'
                                color='white'      
                            />
                        </div>
                    </a>
                    <a class={this.state.toolSelected === 'bucket' ? 'circle-button tool-selected' :  'circle-button'} onClick={() => this.toolClicked('bucket')}>
                        <div class='circle-button-icon'>
                            <Icon size="30"
                                icon={bucket} 
                                name='bucket'
                                color='white'       
                            />
                        </div>
                    </a>

                    <div style={{marginTop: '14px', height: '24px'}}>
                    {(this.state.toolSelected=='brush' || this.state.toolSelected=='eraser') &&
                        
                        "Brush Size:"
                        
                    }
                    {(this.state.toolSelected =='bucket' || this.state.toolSelected=='magicWand') &&
                       
                            "Tolerance:"
                        
                    }
                    </div>
                   
                    <div class='numeric-box-container'>
                        <button onClick={() => this.numericValueUpdate(-1)} disabled={!numericBoxEnabled} class='numeric-box-button'>-</button>
                        {(this.state.toolSelected=='brush' || this.state.toolSelected=='eraser') &&
                            <input class='numeric-text-box' onChange={this.handleChange} disabled={!numericBoxEnabled} type='text' value={this.state.brushSize}></input>
                        }
                        {(this.state.toolSelected =='bucket' || this.state.toolSelected=='magicWand') &&
                            <input class='numeric-text-box' onChange={this.handleChange} disabled={!numericBoxEnabled} type='text' value={this.state.tolerance}></input>
                        }
                        {!(this.state.toolSelected) &&
                            <input class='numeric-text-box' onChange={this.handleChange} disabled={!numericBoxEnabled} type='text' value='0'></input>
                        }
                        <button onClick={() => this.numericValueUpdate(1)} disabled={!numericBoxEnabled} class='numeric-box-button'>+</button>
                    </div>
                </div>
               
               
                <div>
                <ImageCanvas image={this.props.image}/>
                </div>
                
            </div>
        );
    }
}