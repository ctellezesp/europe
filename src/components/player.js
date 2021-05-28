import React, { Component } from 'react';

export default function Player(props){
    if(props.render.toString().includes("http")){
        return(
            <div className="video-container">
                <iframe src={`${props.render}`} width="100%" height="auto" allowFullScreen></iframe>
            </div>
        )
    } else {
        return(
            <div className="video-container">
                <iframe src={`https://drive.google.com/file/d/${props.render}/preview`} width="100%" height="auto" allowFullScreen></iframe>
            </div>
        );
    }
}