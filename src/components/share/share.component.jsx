import { useState, useEffect } from 'react';

import { parse as getQueries } from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import firebase from '../../firebase/config';
import { SpinnerComponent } from '../spinner/spinner.component';
import { PlayerComponent } from '../player/player.component';
import { LeagueDecider } from '../league-decider/league-decider.component';
import { MatchTabsComponent } from '../match-tabs/match-tabs.component';

export const ShareComponent = () => {
	const location = useLocation();
	const history = useHistory();
	const { league, matchId } = getQueries(location.search);
	const [loading, setLoading] = useState(true);
	const [matchItem, setMatchItem] = useState({});

	useEffect(() => {
		const getMatch = async (league, matchId) => {
			try {
				const matchResponse = await firebase.db
					.collection(league)
					.doc(matchId)
					.get();
					const { title, season, home, away, date, stadium, frame, streams } = matchResponse.data();
				const teamHome = await (
					await firebase.db.collection('teams').doc(home).get()
				).data();
				const teamAway = await (
					await firebase.db.collection('teams').doc(away).get()
				).data();
				setMatchItem({
					title,
					season,
					home: teamHome,
					away: teamAway,
					date,
					stadium,
					frame,
					streams
				});
			} catch (err) {
				console.error(err);
				history.push('/');
			} finally {
				setLoading(false);
			}
		};
		getMatch(league, matchId);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [league, matchId]);

	return loading ? (
		<SpinnerComponent />
	) : (
		<>
			<Grid container spacing={1} style={{ marginTop: '5px' }}>
				<Grid item xs={12} lg={8}>
				{matchItem.streams.length > 1 ? (
					<MatchTabsComponent streams={matchItem.streams} />
				) : (
					<PlayerComponent
						render={matchItem.streams[0]?.frame || ''}
					/>
				)}
				</Grid>
				<Grid item xs={12} lg={4}>
					<LeagueDecider 
						league={league}
						home={matchItem.home}
						away={matchItem.away}
						id={matchId}
						title={matchItem.title}
						frame={matchItem.frame}
						streams={matchItem.streams}
						stadium={matchItem.stadium}
						season={matchItem.stadium}
						date={matchItem.date}
						handleClick={() => null}
					/>
				</Grid>
			</Grid>
		</>
	)
};
