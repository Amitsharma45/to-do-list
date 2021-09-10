import './App.css';
import SignUp from './Signup';
import SignIn from './SingIn';
import Home from './Home';
import React, { useState ,useEffect } from 'react';
import './Firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  const [login, setlogin] = useState(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [userid, setuserid] = useState('');
  const [name, setname] = useState();
  const [displayname, setdisplayname] = useState('hi');
  // 3Lr1Lcts4CSosywz0xrK6YtjDIv2
  // let history = useHistory();

  const clearinput = () => {

    setusername('');
    setpassword('');
    setname('');
  }
  const forgot = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, username)
      .then(() => {
        // Password reset email sent!
        alert('Password reset email sent! to your '+ username+'  account');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  }

  const signup = () => {
    if (name && username && password) {
      // alert('hi');
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name
          }).then(() => {
            // Profile updated!
            console.log('complete');
          })

          setuserid(user.uid);
          clearinput();
          alert('You Account Create Sucessfull');
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);

        });
    } else {
      alert('Please Fill All Detail\'s');
    }
  }
  const signin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        clearinput();
        setdisplayname(user.displayName);
        setuserid(user.uid);
        // alert('hi') 

      })
      .catch((error) => {

        const errorMessage = error.message;
        alert(errorMessage);

        // console.log(errorMessage);
      });
  }

  useEffect(()=>{
    

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
  });

  const signout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {

      setuserid('');
      clearinput();
    }).catch((error) => {
      // An error happened.
    });
  }


  return (
    <div className="App">
      <Router>

        {userid === '' ? (
          <Redirect to={{ pathname: "/signin" }} />
        ) : (
          <Redirect to={{ pathname: "/home" }} />
        )}
        <Switch>
          <Route exact path="/signup">
            <SignUp login={login} setlogin={setlogin} setpassword={setpassword} setusername={setusername} signup={signup}
              username={username} password={password} setname={setname} name={name} />
          </Route>
          <Route exact path="/signin">
            <SignIn login={login} setlogin={setlogin} setpassword={setpassword} setusername={setusername} signin={signin} username={username} password={password} forgot={forgot} />
          </Route>
          <Route exact path="/">
            <Redirect to={{ pathname: "/signup" }} />
          </Route>
          <Route exact path="/home">
            <Home userid={userid} signout={signout} displayname={displayname} />
          </Route>
        </Switch>
      </Router >
    </div >
  );
}

export default App;
