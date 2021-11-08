import React from "react";
import "../style/slide.css";
import profileImage from "../assets/my-picture.png";
import vatan from "../assets/vatan.mp3";

class Introduction extends React.Component {
  componentDidMount() {
    function setupTypewriter(t) {
      var HTML = t.innerHTML;

      t.innerHTML = "";

      var cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 10,
        tempTypeSpeed = 0;

      var type = function () {
        if (writingTag === true) {
          tag += HTML[cursorPosition];
        }

        if (HTML[cursorPosition] === "<") {
          tempTypeSpeed = 0;
          if (tagOpen) {
            tagOpen = false;
            writingTag = true;
          } else {
            tag = "";
            tagOpen = true;
            writingTag = true;
            tag += HTML[cursorPosition];
          }
        }
        if (!writingTag && tagOpen) {
          tag.innerHTML += HTML[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
          if (HTML[cursorPosition] === " ") {
            tempTypeSpeed = 0;
          } else {
            tempTypeSpeed = Math.random() * typeSpeed + 20;
          }
          t.innerHTML += HTML[cursorPosition];
        }
        if (writingTag === true && HTML[cursorPosition] === ">") {
          tempTypeSpeed = Math.random() * typeSpeed + 20;
          writingTag = false;
          if (tagOpen) {
            var newSpan = document.createElement("span");
            t.appendChild(newSpan);
            newSpan.innerHTML = tag;
            tag = newSpan.firstChild;
          }
        }

        cursorPosition += 1;
        if (cursorPosition < HTML.length - 1) {
          setTimeout(type, tempTypeSpeed);
        }
      };

      return {
        type: type,
      };
    }

    let typer = document.getElementById("typewriter");

    let typewriter = setupTypewriter(typer);

    typewriter.type();
  }
  render() {
    const { mute } = this.props;
    return (
      <div id="intro">
        {/* <audio controls autoPlay={true} muted={mute} style={{ opacity: "0" }}>
          <source src={vatan} type="audio/mpeg"></source>
        </audio> */}
        <img src={profileImage} alt="profile-pic" id="profile-pic" />
        <p id="typewriter">
          This is ghanshyam, who graduated in mechanical engineering from NIT,
          Uttarakhand with minor degree in Compputer Science. during the
          engineering i realise my passion towards computers science. and here i
          am, daily learning DataStructure, Algorithm, DBMS, system design,
          python, javascript, nodejs....
        </p>
      </div>
    );
  }
}

export default Introduction;
