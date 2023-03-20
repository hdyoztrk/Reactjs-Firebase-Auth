import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../Firebase";
import "../styles/components/Appbar.css";

function Appbar() {
  const navigate = useNavigate();
  const logoutFunction = async () => {
    toast.success("Exit is in progress...");
    await signOut(auth);
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };
  return (
    <div className="appbar">
      <div className="appbar-title">WELCOME</div>
      <div onClick={logoutFunction} className="appbar-logout">
        Logout
      </div>
    </div>
  );
}

export default Appbar;
