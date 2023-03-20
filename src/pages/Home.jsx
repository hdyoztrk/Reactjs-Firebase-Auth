import React from "react";
import "../styles/pages/Home.css";

function Home({ fbUsers }) {
  return (
    <>
      <div className="home">
        WELCOME <span>{fbUsers?.email}</span>
      </div>
    </>
  );
}

export default Home;
