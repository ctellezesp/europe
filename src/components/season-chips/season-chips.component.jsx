import React from 'react';


export const SeasonsChips = ({ seasons, currentSeason, handleClick }) => {
  return (
    <div className="tags-scroll">
        {seasons.map((season, index) => (
          <span 
            key={index} 
            className={`season MuiPaper-elevation6 ${currentSeason === season ? 'active-season': ''}`}
            onClick={() => handleClick(season)}
          >
            {season}
          </span>
        ))}
      </div>
  )
}