import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  nav:{
    [theme.breakpoints.down('400')]: {
      // backgroundColor: 'red',
      flexDirection:'column',
      // width:'250px',
      
      }
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const {displayname ,signout}=props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.nav}>
          <Typography variant="h6" className={classes.title}>
            To-Do-List
          </Typography>
          <div>
            <span>Welcome, { displayname}</span>
            <Button color="inherit" onClick={signout}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;