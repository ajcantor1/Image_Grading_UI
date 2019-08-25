import React, { Component } from 'react';
import axios from 'axios';
import { height } from '@material-ui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush, faEraser } from '@fortawesome/free-solid-svg-icons';
import { magicWand } from 'react-icons-kit/icomoon/magicWand';
import { Icon } from 'react-icons-kit';
import {bucket} from 'react-icons-kit/entypo/bucket';

export default class ImageEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={{
    
                }}>
                <div id="image-tools-section">
                    <a class='circle-button'>
                      
                        <div class='circle-button-icon'>
                            <FontAwesomeIcon size="md" icon={faPaintBrush} color='white' />
                        </div>
                    </a>
                    <a class='circle-button'>
                        <div class='circle-button-icon'>
                            <FontAwesomeIcon size="md" icon={faEraser} color='white' />
                        </div>
                    </a>
                    <a class='circle-button'>
                        <div class='circle-button-icon wand-icon'>
                            <Icon size="42"
                                icon={magicWand} 
                                color='white'       
                            />
                        </div>
                    </a>
                    <a class='circle-button'>
                        <div class='circle-button-icon wand-icon'>
                            <Icon size="42"
                                icon={bucket} 
                                color='white'       
                            />
                        </div>
                    </a>
                </div>
               
                <div id="image-canvas-section"/>
            </div>
        );
    }
}