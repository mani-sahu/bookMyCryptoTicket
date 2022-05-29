import "./Home.css";
import React from "react";
import flightvideo from "./flightvideo.mp4"


const HomeBody = (props) => {

  return (
    <div className="homeBody">

      <div className="container-fluid " id="header">
        <video src={flightvideo} autoPlay loop muted />
        <div className="container py-5">
          <h1 className="title">BookMyCryptoTicket</h1>
        </div>
      </div>
      <div className="container-fluid py-5" id="about">
        <div className="container py-5">
          <h1>About</h1>
          <div className="p-3 mb-0">
            <blockquote className="blockquote fst-italic">
              <p>
                “There’s a lot of us out here that are birds, man. We all need to just fly.”
              </p>
            </blockquote>
            <figcaption className="blockquote-footer fst-italic text">
              Travis Scott
            </figcaption>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

          </div>
        </div>
      </div>

    </div>
  );
};

export default HomeBody;