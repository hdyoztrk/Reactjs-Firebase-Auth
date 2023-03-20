import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Appbar from "./components/Appbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";

function App() {
  const [fbUsers, setfbUsers] = useState(null);

  const authStateChanged = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setfbUsers(user);
      }
    });
  };

  useEffect(() => {
    authStateChanged();
  }, []);

  return (
    <>
      <BrowserRouter>
        {fbUsers?.accessToken && <Appbar />}
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="home" element={<Home fbUsers={fbUsers} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      <ToastContainer />
    </>
  );
}

export default App;
