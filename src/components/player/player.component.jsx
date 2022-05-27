import React from 'react';
import './player.styles.css';

export const PlayerComponent = ({ render }) => {
  
  const frame = render.toString().includes("http") ? render : `https://drive.google.com/file/d/${render}/preview`;
  
  return (
    <div className="video-container">
      <iframe title='frame' src={frame} width="100%" height="auto" allowFullScreen></iframe>
      <span className='loading-text'>Loading Video...</span>
    </div>
  );
}