import { useState } from 'react';

import { 
  Paper,
  IconButton,
  InputBase,
  Divider
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: '10px 0'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export const SearchBarComponent = ({ onSearch, onCancel }) => {
  const classes = useStyles();
  const [search, setSearch] = useState('');

  const handleSearch = event => {
    const { value } = event.target;
    if(!value) {
      onCancel();
    }
    setSearch(value);
  }

  const view = (event) => {
		const { keyCode } = event;
		if (keyCode === 13) {
			onSearch(search);
		}
	};

  const handleCancel = () => {
    setSearch('');
    onCancel();
  }
  
  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search here..."
        inputProps={{ 'aria-label': 'search', onKeyUp: view }}
        onChange={handleSearch}
        value={search}
      />
      <IconButton 
        className={classes.iconButton} 
        aria-label="search" onClick={() => onSearch(search)}
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton 
        color="primary" 
        className={classes.iconButton} 
        aria-label="clear"
        onClick={handleCancel}
      >
        <ClearIcon />
      </IconButton>
    </Paper>
  );
}