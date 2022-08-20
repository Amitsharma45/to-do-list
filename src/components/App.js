import './App.css';
import SignUp from './Signup';
import SignIn from './SingIn';
import Preloader from './preloader';
import Home from './Home';
import React, { useState  } from 'react';
import './Firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,  sendPasswordResetEmail, updateProfile } from "firebase/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [login, setlogin] = useState(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [userid, setuserid] = useState('');
  const [name, setname] = useState();
  const [displayname, setdisplayname] = useState('hi');
  const [loading, setLoading] = useState(false);
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
          // alert(errorMessage);
          // console.log(errorMessage);
          if(errorMessage === "Firebase: Error (auth/email-already-in-use)."){
            alert("Email already registered");
          }else if(errorMessage === "Firebase: Error (auth/weak-password)."){
            alert("A password should be at least 6 characters");
          }else{
            alert(errorMessage);
          }

        });
    } else {
      alert('Please fil all the details in the form');
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
        
      })
      .catch((error) => {

        const errorMessage = error.message;
        
        if(errorMessage === "Firebase: Error (auth/user-not-found)."){
          alert("Please Check You Email I'd");
        }else if(errorMessage === "Firebase: Error (auth/wrong-password)."){
          alert("Please Check You Password");
        }else{
          alert(errorMessage);
        }
        // console.log(errorMessage);
      });
  }
  const signintest = (em,pas) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, em, pas)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        clearinput();
        setdisplayname(user.displayName);
        setuserid(user.uid);
        
      })
      .catch((error) => {

        const errorMessage = error.message;
        
        if(errorMessage === "Firebase: Error (auth/user-not-found)."){
          alert("Please Check You Email I'd");
        }else if(errorMessage === "Firebase: Error (auth/wrong-password)."){
          alert("Please Check You Password");
        }else{
          alert(errorMessage);
        }
        // console.log(errorMessage);
      });
  }

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
             <SignUp login={login} setlogin={setlogin} setpassword={setpassword} setusername={setusername} signup={signup} username={username} password={password} setname={setname} name={name} loading={loading}/> 
            {/* <Preloader loading={loading} /> */}

          </Route>
          <Route exact path="/signin">
            <SignIn login={login} setlogin={setlogin} setpassword={setpassword} setusername={setusername} signin={signin} username={username} password={password} forgot={forgot} loading={loading} setdisplayname={setdisplayname} signintest= {signintest} />
            {/* <Preloader loading={loading}/> */}

          </Route>
          <Route exact path="/">
            <Redirect to={{ pathname: "/signup" }} />
          </Route>
          <Route exact path="/home">
            <Home userid={userid} signout={signout} displayname={displayname} loading={loading} setLoading={setLoading}/>
          </Route>
        </Switch>
      </Router >
    </div >
  );
}

export default App;
