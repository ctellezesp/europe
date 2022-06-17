import { memo } from 'react';

import { Avatar, Typography } from '@material-ui/core';

const FALLBACK_LOGO =
	'https://ruizhealytimes.com/wp-content/uploads/2015/05/fifa.png';

const TeamInfo = ({
	img,
	team,
}) => {
	return (
		<div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
      <Avatar
        src={img || FALLBACK_LOGO}
        alt={team}
      />
      <Typography variant="body1">{team}</Typography>
    </div>
	);
};

export default memo(TeamInfo);
