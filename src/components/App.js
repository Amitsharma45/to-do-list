import './App.css';
import SignUp from './Signup';
import SignIn from './SingIn';
import Home from './Home';
import React, { useState } from 'react';
import './Firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
function App() {
  const [login, setlogin] = useState(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [userid, setuserid] = useState('');

  const clearinput = () => {
    // console.log('fuck');
    setusername('');
    setpassword('');
  }

  const signup = () => {
    // console.log('hggggg');
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        sendEmailVerification(auth.currentUser)
          .then(() => {
            // Email verification sent!
            console.log('Email verification sent!');
            // ...
          });
        setuserid(user.uid);
        console.log(user);
        clearinput();
        alert('You Account Create Sucessfull');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }

  const signin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in 

        const user = userCredential.user;
        clearinput();
        setuserid(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    // console.log('hi');
  }

  const signout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {

      setuserid('');
      clearinput();
    }).catch((error) => {
      // An error happened.
    });
    // console.log('i am working');

  }


  return (
    <div className="App">

      {(userid == '') ? (
        [(login) ? (
          <SignUp login={login} setlogin={setlogin} setpassword={setpassword} setusername={setusername} signup={signup}
            username={username} password={password} />
        ) : (
          <SignIn login={login} setlogin={setlogin} setpassword={setpassword} setusername={setusername} signin={signin} username={username} password={password} />
        )]

      ) : (
        <Home userid={userid} signout={signout} />
      )

      }




    </div>
  );
}

export default App;
