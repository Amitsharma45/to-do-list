import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from "react-router-dom";
import { getAuth,  signInWithEmailAndPassword } from "firebase/auth";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {/* <Link color="inherit" href="https://material-ui.com/"> */}
        To-Do-List
      {/* </Link> */}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



function SignIn(props) {
  const classes = useStyles();
  const {  setpassword, setusername, signin, username, password ,forgot ,signintest} = props;
  function testlogin(){
    // setusername);
    // setpassword('12345678')
    signintest('test@gmail.com','12345678');
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={(e) => { e.preventDefault() }} className={classes.form} noValidate>
          <TextField
            isRequired="true"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={username}
            autoComplete="email"
            autoFocus
            onChange={e => setusername(e.target.value)}
          // helperText="hi i am error"
          />
          <TextField
            isRequired="true"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={e => setpassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => signin()}
          >
            Sign In
          </Button>
          <div style={{textAlign : 'center' ,fontSize : '18px'}} >or </div>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{margin : '8px 0px'}}
            onClick={testlogin}
          >
            Login with Test Account
          </Button>
          <Grid container>
          <Grid item xs>
              <Link  style={{textDecoration: 'none'}} to='#' onClick={() => forgot()} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link style={{textDecoration: 'none'}} variant="body2" to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default SignIn;