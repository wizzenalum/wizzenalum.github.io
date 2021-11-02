import React from "react";
import "../style/slide.css";
import profileImage from "../assets/my-picture.png";
import vatan from "../assets/vatan.mp3";

function Introduction(props) {
  const { mute } = props;
  return (
    <div id="intro">
      <audio controls autoPlay={true} muted={mute} style={{ opacity: "0" }}>
        <source src={vatan} type="audio/mpeg"></source>
      </audio>
      <img src={profileImage} alt="profile-pic" id="profile-pic" />
      <p>
        This is ghanshyam, who graduated in mechanical engineering from NIT,
        Uttarakhand with minor degree in Compputer Science. during the
        engineering i realise my passion towards computers science. and here i
        am, daily learning DataStructure, Algorithm, DBMS, system design,
        python, javascript, nodejs....
      </p>
    </div>
  );
}

export default Introduction;
