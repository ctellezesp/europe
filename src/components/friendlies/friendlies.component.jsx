import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';

import TeamInfoComponent from './team-info.component';

export const FriendliesComponent = ({ id, season, title, home, away, stadium, frame, streams, date, handleClick }) => {
  const match = { id, season, title, home, away, stadium, frame, streams };
  return (
		<Paper
			elevation={2}
			style={{ padding: '10px', cursor: 'pointer' }}
			onClick={() => handleClick(match)}
		>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Typography variant="body2">{title}</Typography>
				</Grid>
				<Grid item xs={8}>
					<Grid direction="column" spacing={1}>
						<TeamInfoComponent
							img={home?.img || ''}
							team={home.name || ''}
						/>
						<TeamInfoComponent
							img={away?.img || ''}
							team={away?.name || ''}
						/>
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<Grid
						direction="column"
						justifyContent="center"
						alignItems="flex-end"
						spacing={1}
						styles={{ padding: '10px' }}
					>
						<Typography variant="body1" align="right">
							{date}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
};