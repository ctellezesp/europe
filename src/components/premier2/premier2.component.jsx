import React from 'react';

import './premier2.css';

export const Premier2022 = ({
  title,
  id,
  stadium,
  home,
  away,
  frame,
  streams,
  handleClick
}) => {
  return (
    <div 
      className='premier2022'
      onClick={() => handleClick({
        id,
        stadium,
        home,
        away,
        title,
        frame,
        streams
    })}>
      <div className='premier2022-header'>
        <div className='premier2022-badge'>
          <div className='premier2022-badge-logo'>
            <img className='premier2022-badge-logo-img' alt='Premier' src='https://www.premierleague.com/resources/prod/v6.101.4-4472/i/favicon/apple-touch-icon-152x152.png' />
          </div>
          <div className='premier2022-badge-title'>
            <span>{title}</span>
          </div>
        </div>
      </div>
      <div className='premier2022-body'>
        <div className='premier2022-team'>
          <img className='premier2022-team-img' src={home.img} alt={home.name} />
        </div>
        <div className='premier2022-v'>
          <span>V</span>
        </div>
        <div className='premier2022-team'>
          <img className='premier2022-team-img' src={away.img} alt={away.name} />
        </div>
      </div>
      <div className='premier2022-footer'>
        <span>{stadium}</span>
      </div>
    </div>
  )
}