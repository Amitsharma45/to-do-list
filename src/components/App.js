import './App.css';
import SignUp from './Signup';
import SignIn from './SingIn';
import Home from './Home';
import React, { useState } from 'react';
import './Firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification ,sendPasswordResetEmail,updateProfile   } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
function App() {
  const [login, setlogin] = useState(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [userid, setuserid] = useState('');
  const [name, setname] = useState();
  const [displayname, setdisplayname] = useState('hi');
  // 3Lr1Lcts4CSosywz0xrK6YtjDIv2
  // const db = getDatabase();
  const clearinput = () => {
    // console.log('fuck');
    setusername('');
    setpassword('');
    setname('');
  }
  const forgot =()=>{
    console.log('g');
    const auth = getAuth();
    sendPasswordResetEmail(auth, username)
      .then(() => {
        // Password reset email sent!
        alert('Succes fully send mail please check email');
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
          // const u=user.uid;
          // console.log(u);
          updateProfile(user, {
            displayName: name
          }).then(() => {
            // Profile updated!
            console.log('complete');
          })
          // set(ref(db, 'users/' + u), {
          //   name: [name]
          // });
          setuserid(user.uid);
          clearinput();
          alert('You Account Create Sucessfull');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode);
          // ..
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
        // console.log(user.displayName);
        // console.log(name);

      })
      .catch((error) => {
        
        const errorMessage = error.message;
        alert(errorMessage);
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
    // console.log('i am working');

  }


  return (
    <div className="App">

      {(userid == '') ? (
        [(login) ? (
          <SignUp login={login} setlogin={setlogin} setpassword={setpassword} setusername={setusername} signup={signup}
            username={username} password={password} setname={setname} name={name} />
        ) : (
          <SignIn login={login} setlogin={setlogin} setpassword={setpassword} setusername={setusername} signin={signin} username={username} password={password} forgot={forgot}/>
        )]

      ) : (
        <Home userid={userid} signout={signout} displayname={displayname} />
      )

      }


    </div>
  );
}

export default App;
