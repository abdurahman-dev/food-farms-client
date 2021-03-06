import React, { useContext } from "react";
import "./LogIn.css";
import firebase from "firebase/app";
import "firebase/auth";
import googleIcon from "../../logos/icons/Group 573.png";
import { firebaseConfig } from "./AuthConfig";
import { userContext } from "../../App";
import { Link, useHistory, useLocation } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const LogIn = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const provider = new firebase.auth.GoogleAuthProvider();

  const [logInUser, setLogInUser] = useContext(userContext);

  const handleSingIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        const newUser = { ...user };
        setLogInUser(newUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <>
      <div className="container pt-4">
        <div className="navlogo  text-center">
          <Link to="/" className="text-decoration-none">
            <h1>FOODS FARM</h1>
          </Link>
        </div>
        <div className="mt-4 logInform d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h2 className="pb-2">Login With</h2>
            <button
              className="btn btn-outline-primary mb-3"
              onClick={handleSingIn}
            >
              <img
                src={googleIcon}
                alt="google icon"
                style={{ width: "26px", marginRight: "1em" }}
              />
              Continue With Google
            </button>
            <p>
              Don't have an account? <Link to="">Create a new account</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
