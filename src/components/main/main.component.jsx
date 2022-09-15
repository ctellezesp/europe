import { useState, useEffect, useContext, forwardRef } from 'react';

import firebase from '../../firebase/config';
import { PremierComponent } from '../premier/premier.component';
import { Premier2022 } from '../premier2/premier2.component';
import { LaLigaComponent } from '../la-liga/la-liga.component';
import { SerieAComponent } from '../serie-a/serie-a.component';
import { BundesligaComponent } from '../bundesliga/bundesliga.component';
import { Ligue1Component } from '../ligue-1/ligue-1.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ChampionsComponent } from '../champions/champions.component';
import LEAGUE_OPTIONS from '../../constants/league-options.constant';
import { AppContext } from '../../context/app.context';
import {  
  Grid,
  Typography, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { toast } from 'react-toastify';

import { PlayerComponent } from '../player/player.component';
import { MatchTabsComponent } from '../match-tabs/match-tabs.component';
import { FriendliesComponent } from '../friendlies/friendlies.component';
import { SearchBarComponent } from '../commons/search-bar/search-bar.component';
import '../cards.css';
import './main.styles.css';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const MainComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const appContext = useContext(AppContext);

  const [state, setState] = useState({
    premier: [],
    laliga: [],
    bundesliga: [],
    seriea: [],
    ligue1: [],
    champions: [],
    friendlies: [],
    data: [],
    league: '',
    seasons: [],
    teams: [],
    loading: true,
    season: '',
    searchValue: '',
    leagueInfo: null,
  });

  const [matchModal, setMatchModal] = useState({
    open: false,
    match: null,
  });

  useEffect(() => {
    fetchTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterBySeason = (matches, season) => {
    return matches.filter(match => match.season === season);
  }

  const fetchLeague = async (league) => {
    const leagueValue = league.value;
    if(appContext[leagueValue] && appContext[leagueValue].length > 0) {
      const seasons = new Set();
      const matches = appContext[leagueValue];
      matches.forEach((item) => seasons.add(item.season));
      const defaultSeason = [...seasons].slice().sort().reverse()[0];
      setState({
        ...state,
        [league]: matches,
        data: appContext.getMatchesBySeason(leagueValue, defaultSeason),
        league: leagueValue,
        seasons: [...seasons],
        season: defaultSeason,
        loading: false,
        leagueInfo: league
      });
    } else {
      setState({
        ...state,
        loading: true
      });
      try {
        const response = await firebase.db.collection(leagueValue).orderBy('date', 'desc').get();
        const seasons = new Set();
        const matches = response.docs.map(doc => ({
          ...doc.data(),
          id: doc.ref.id
        }));
        matches.forEach((item) => seasons.add(item.season));
        const defaultSeason = [...seasons].slice().sort().reverse()[0];
        setState({
          ...state,
          [leagueValue]: matches,
          data: filterBySeason(matches, defaultSeason),
          league: leagueValue,
          seasons: [...seasons],
          season: defaultSeason,
          loading: false,
          leagueInfo: league
        });
        appContext.storeMatches(leagueValue, matches);
      } catch (err) {
        console.log({ err });
      }
    }
  }

  const fetchTeams = async () => {
    if(appContext.teams.length > 0) {
      setState({
        ...state,
        teams: appContext.teams,
        loading: false
      });
    } else {
      const response = await firebase.db.collection('teams').orderBy('name', 'asc').get();
      const teams = response.docs.map(doc => ({
        ...doc.data(),
        id: doc.ref.id
      }))
      setState({
        ...state,
        teams,
        loading: false
      });
      appContext.storeTeams(teams);
    }
  }

  const getTeam = (id) => {
    return appContext.getTeam(id);
  }

  const getMatchesBySeason = (league, season) => {
    setState({
      ...state,
      data: filterBySeason(state[league], season),
      season,
      searchValue: ''
    });
  }

  const handleSearch = value => {
    const search = appContext.searchMatches(state.league, state.season, value);
    setState({
      ...state,
      data: search,
    });
  }

  const handleCancelSearch = () => {
    setState({
      ...state,
      data: state[state.league]
    })
  }

  const handleOpenModal = (match) => {
    setMatchModal({
      match,
      open: true
    })
  }

  const handleCloseModal = () => {
    setMatchModal({
      ...matchModal,
      open: false
    })
  }

  const generateTitle = match => {
    return match ? (
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <img height="30px" style={{ margin: '0 10px 0 0' }} src={state.leagueInfo.image} alt={state.leagueInfo.name} />
        <Typography variant="body1">
          {isMobile ? `${match.home.name} vs ${match.away.name}` : `${match.home.name} vs ${match.away.name} | ${match.title} | ${state.season}`}
          </Typography>
      </div>
    ) : '';
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.href}share?league=${state.league}&matchId=${matchModal.match.id}`);
    toast.info('Link copy to clipboard', {
      position: toast.POSITION.BOTTOM_RIGHT,
      hideProgressBar: true
    });
  }

  return state.loading ? (
    <SpinnerComponent />
    ) : (
    <div className="main-body">
      <div>
        <div className="leagues-scroll">
          {LEAGUE_OPTIONS.map(league => (
            <div 
              key={league.value} 
              className={`scroll-item MuiPaper-elevation6 ${state.league === league.value ? 'active-league' : ''}`}
            >
              <img 
                className="league-img-scroll" 
                alt={league.name} 
                src={league.image} 
                onClick={() => fetchLeague(league)} 
              />
            </div>
          ))}
        </div>
      {state.data.length > 0 && (
        <Grid container direction="row" justifyContent="center" alignItems="center" style={{ justifyContent: 'center' }}>
          <Grid item xs={12} md={10} lg={8}>
            <SearchBarComponent onSearch={handleSearch} onCancel={handleCancelSearch} />
          </Grid>
        </Grid>
      )}
      <div className="tags-scroll">
        {state.seasons.map((season, index) => (
          <span 
            key={index} 
            className={`season MuiPaper-elevation6 ${state.season === season ? 'active-season': ''}`}
            onClick={() => getMatchesBySeason(state.league, season)}
          >
            {season}
          </span>
        ))}
      </div>
      {state.data.length === 0 && state.seasons.length === 0 && (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img src="https://logodix.com/logo/1999222.png" style={{ height: 'auto', width: '60%' }} alt="UEFA" />
        </div>
      )}
        {state.data.length === 0 && state.league && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body1" align="center" color="error">
              No matches found
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => getMatchesBySeason(state.league, state.season)} 
              color="secondary"
            >
              Show All Matches
            </Button>
          </Grid>
        )}
        <div className="grid-matches">
          {state.league === 'premier' && state.data.length > 0 && state.data.map((match, index) => (
            <Premier2022 
              key={index} 
              id={match.id} 
              stadium={match.stadium}
              home={getTeam(match.home)}
              away={getTeam(match.away)}
              title={match.title}
              frame={match.frame}
              streams={match.streams}
              handleClick={handleOpenModal}
            />
          ))}
          {state.league === 'laliga' && state.data.length > 0 && state.data.map((match, index) => (
            <LaLigaComponent 
              key={index}
              id={match.id}
              stadium={match.stadium}
              home={getTeam(match.home)}
              away={getTeam(match.away)}
              title={match.title}
              frame={match.frame}
              streams={match.streams}
              handleClick={handleOpenModal}
            />
          ))}
          {state.league === 'seriea' && state.data.length > 0 && state.data.map((match, index) => (
            <SerieAComponent 
              key={index}
              id={match.id}
              title={match.title}
              home={getTeam(match.home)}
              away={getTeam(match.away)}
              stadium={match.stadium}
              frame={match.frame}
              streams={match.streams}
              handleClick={handleOpenModal}
            />
          ))}
          {state.league === 'bundesliga' && state.data.length > 0 && state.data.map((match, index) => (
            <BundesligaComponent 
              key={index}
              id={match.id}
              season={match.season}
              title={match.title}
              home={getTeam(match.home)}
              away={getTeam(match.away)}
              stadium={match.stadium}
              frame={match.frame}
              streams={match.streams}
              handleClick={handleOpenModal}
            />
          ))}
          {state.league === 'ligue1' && state.data.length > 0 && state.data.map((match, index) => (
            <Ligue1Component 
              key={index}
              id={match.id}
              title={match.title}
              home={getTeam(match.home)}
              away={getTeam(match.away)}
              frame={match.frame}
              streams={match.streams}
              handleClick={handleOpenModal}
            />
          ))}
          {state.league === 'champions' && state.data.length > 0 && state.data.map((match) => (
            <ChampionsComponent 
              key={match.id}
              id={match.id}
              title={match.title}
              home={getTeam(match.home)}
              away={getTeam(match.away)}
              stadium={match.stadium}
              frame={match.frame}
              streams={match.streams}
              handleClick={handleOpenModal}
            />
          ))}
          {state.league === 'friendlies' && state.data.length > 0 && state.data.map((match) => (
            <FriendliesComponent 
              key={match.id}
              id={match.id}
              title={match.title}
              home={getTeam(match.home)}
              away={getTeam(match.away)}
              stadium={match.stadium}
              frame={match.frame}
              streams={match.streams}
              date={match.date}
              handleClick={handleOpenModal}
            />
          ))}
        </div>
      </div>
      <Dialog 
        open={matchModal.open} 
        onClose={handleCloseModal} 
        TransitionComponent={Transition}
        maxWidth={'lg'}
        fullWidth={true}
      >
        <DialogTitle style={{ padding: '5px 24px' }}>
          {matchModal.match && generateTitle(matchModal.match)}   
        </DialogTitle>
        <DialogContent style={{ padding: '0px' }}>
          <div
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
						}}
					>
						{matchModal.match && matchModal.match.streams && matchModal.match.streams.length > 1 ? (
							<MatchTabsComponent streams={matchModal.match.streams} />
						) : (
							<PlayerComponent
								render={(matchModal?.match?.streams && matchModal.match?.streams[0]?.frame) || matchModal?.match?.frame || ''}
							/>
						)}
					</div>
        </DialogContent>
        <div className="modal-actions">
          <IconButton 
            aria-label="close"
            size='small'
            onClick={handleCloseModal}
          >
            <CloseIcon  />
          </IconButton>
          <IconButton 
            color="primary"
            aria-label="share"
            size='small'
            onClick={handleShare}
          >
            <ShareIcon  />
          </IconButton>
        </div>
      </Dialog>
    </div>
  )
}