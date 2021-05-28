import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import firebase from '../firebase/config';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    UEFA Leagues
                </Typography>
                <Link to="/" style={{color: 'white'}}>
                    <Button color="inherit">Home</Button>
                </Link>
                </Toolbar>
            </AppBar>
        );
    }
}