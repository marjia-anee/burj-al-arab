import React, { useContext} from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router-dom';

export 

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);

    }
    


    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();

        
        firebase.auth().signInWithPopup(googleProvider).then(function(result) {
           
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email: email}
            setLoggedInUser(signedInUser);
            history.replace(from);

            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });

    }

    const handleFbSignIn = () => {

        const fbProvider = new firebase.auth.FacebookAuthProvider();
        
        firebase.auth().signInWithPopup(fbProvider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            setLoggedInUser(loggedInUser);
            console.log('sign in user' , user);
            // ...
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            // ...
          });

    }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <br/>
            <button onClick = {handleFbSignIn}>Sign in using Facebook</button>
        </div>
    );
};

export default Login;