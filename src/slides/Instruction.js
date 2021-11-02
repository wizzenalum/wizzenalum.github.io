import React, { Component } from "react";
import vatan from "../assets/vatan.mp3";

export default class Instruction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "0%",
      opacity: 0,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ width: "95%", opacity: "1" });
    }, 0);
  }
  render() {
    const { handleButton, mute } = this.props;
    const { width, opacity } = this.state;
    return (
      <div id="instruction" className="slide">
        <audio controls autoPlay={true} muted={mute} style={{ opacity: "0" }}>
          <source src={vatan} type="audio/mpeg"></source>
          <p>
            Your browser doesn't support HTML5 audio. Here is a{" "}
            <a href="myAudio.mp3">link to the audio</a> instead.
          </p>
        </audio>
        <div className="toc-container">
          <div></div>
          <div>
            <div
              className="work leafs"
              style={{ width, opacity }}
              onClick={() => handleButton("direct", 4)}
            >
              work
            </div>
          </div>
          <div></div>
          <div>
            <div
              className="skill leafs"
              style={{ width, opacity }}
              onClick={() => handleButton("direct", 3)}
            >
              skill
            </div>
          </div>
          <div>
            <div
              className="contact leafs"
              style={{ width, opacity }}
              onClick={() => handleButton("direct", 5)}
            >
              contact
            </div>
          </div>
          <div>
            <div
              className="bio leafs"
              style={{ width, opacity }}
              onClick={() => handleButton("direct", 1)}
            >
              bio
            </div>
          </div>
          <div></div>
          <div>
            <div
              className="education leafs"
              style={{ width, opacity }}
              onClick={() => handleButton("direct", 2)}
            >
              education
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}
