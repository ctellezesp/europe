import React from 'react';

import { Premier2022 } from '../premier2/premier2.component';
import { BundesligaComponent } from '../bundesliga/bundesliga.component';
import { LaLigaComponent } from '../la-liga/la-liga.component';
import { SerieAComponent } from '../serie-a/serie-a.component';
import { Ligue1Component } from '../ligue-1/ligue-1.component';
import { ChampionsComponent } from '../champions/champions.component';
import { FriendliesComponent } from '../friendlies/friendlies.component';

export const LeagueDecider = ({ 
  league, 
  home, 
  away, 
  id, 
  title, 
  frame, 
  streams, 
  stadium, 
  handleClick, 
  season, 
  date 
}) => {
  return (
    <>
      {league === 'champions' && (
        <ChampionsComponent
          id={id} 
          stadium={stadium}
          home={home}
          away={away}
          title={title}
          frame={frame}
          streams={streams}
          handleClick={handleClick}
        />
      )}
      {league === 'bundesliga' && (
        <BundesligaComponent 
          id={id}
          season={season}
          title={title}
          home={home}
          away={away}
          stadium={stadium}
          frame={frame}
          streams={streams}
          handleClick={handleClick}
        />
      )}
      {league === 'laliga' && (
        <LaLigaComponent 
          id={id}
          stadium={stadium}
          home={home}
          away={away}
          title={title}
          frame={frame}
          streams={streams}
          handleClick={handleClick}
        />
      )}
      {league === 'seriea' && (
        <SerieAComponent 
          id={id}
          title={title}
          home={home}
          away={away}
          stadium={stadium}
          frame={frame}
          streams={streams}
          handleClick={handleClick}
        />
      )}
      {league === 'ligue1' && (
        <Ligue1Component 
          id={id}
          title={title}
          home={home}
          away={away}
          frame={frame}
          streams={streams}
          handleClick={handleClick}
        />
      )}
      {league === 'premier' && (
        <Premier2022 
          id={id} 
          stadium={stadium}
          home={home}
          away={away}
          title={title}
          frame={frame}
          streams={streams}
          handleClick={handleClick}
        />
      )}
      {league === 'friendlies' && (
        <FriendliesComponent 
          key={id}
          id={id}
          title={title}
          home={home}
          away={away}
          stadium={stadium}
          frame={frame}
          streams={streams}
          date={date}
          handleClick={handleClick}
        />
      )}
    </>
  )
}