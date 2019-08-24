import React, { Component } from 'react';
import axios from 'axios';
import { height } from '@material-ui/system';

export default class ImageEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={{height: '100%'}}>
                <div id="image-tools-section"/>

                <div id="image-canvas-section"/>
            </div>
        );
    }
}