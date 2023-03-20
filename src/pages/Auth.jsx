import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../Firebase";
import "../styles/pages/Auth.css";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

function Auth() {
  const [signUp, setSignUp] = useState(true);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const authFunction = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const authBttn = async () => {
    if (signUp) {
      try {
        const FbData = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = FbData.user;
        if (user) {
          navigate("/home");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const FbData = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = FbData.user;
        if (user) {
          navigate("/home");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const withgoogle = async () => {
    try {
      const FbData = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(FbData);
      const token = credential.accessToken;
      const user = FbData.user;
      if (user) {
        navigate("/home");
      }
    } catch (error) {
      const credential = GoogleAuthProvider.credentialFromError(error);
      toast.error(credential);
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <h2> {signUp ? "SIGN UP" : "SIGN IN"}</h2>
        <input
          name="email"
          value={data.email}
          onChange={authFunction}
          type="email"
          placeholder="Email"
        />
        <input
          name="password"
          value={data.password}
          onChange={authFunction}
          type="password"
          placeholder="Password"
        />
        <div onClick={withgoogle} className="withgoogle">
          Sign In With Google
        </div>
        <p
          onClick={() => {
            setSignUp(!signUp);
          }}
        >
          {signUp ? "I ALREADY HAVE AN ACCOUNT" : "SIGN UP"}
        </p>
        <div onClick={authBttn} className="auth-container-button">
          {signUp ? "SIGN UP" : "SIGN IN"}
        </div>
      </div>
    </div>
  );
}

export default Auth;
