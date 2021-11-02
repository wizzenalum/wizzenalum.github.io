import React, { Component } from "react";

export class Skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: ["0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%"],
      background: [
        "rgb(156, 36, 43)",
        "rgb(99, 27, 27)",
        "rgb(99, 8, 27)",
        "rgb(18, 70, 16)",
        "rgb(43, 27, 99)",
        "rgb(77, 22, 54)",
        "rgb(27, 99, 95)",
        "rgb(99, 94, 27)",
        "rgb(99, 27, 83)",
      ],
    };
  }

  handleMouse = () => {
    this.setState({
      progress: ["80%", "80%", "75%", "85%", "90%", "65%", "80%", "70%"],
    });
  };
  handleMouseOut = () => {
    this.setState({
      progress: ["0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%"],
    });
  };

  render() {
    const { progress, background } = this.state;
    return (
      <div
        id="skill"
        onMouseOver={this.handleMouse}
        onMouseOut={this.handleMouseOut}
      >
        <h2>SKILLS</h2>
        <div class="skill-content">
          <div>
            <div
              class="fill-color1 progress"
              style={{
                width: progress[1 - 1],
                backgroundColor: background[1 - 1],
              }}
            >
              <p>HTML</p>
            </div>
          </div>
          <div class="">
            <div
              class="fill-color2 progress"
              style={{
                width: progress[2 - 1],
                backgroundColor: background[2 - 1],
              }}
            >
              <p>CSS</p>
            </div>
          </div>
          <div class="">
            <div
              class="fill-color3 progress"
              style={{
                width: progress[3 - 1],
                backgroundColor: background[3 - 1],
              }}
            >
              <p>JavaScript</p>
            </div>
          </div>
          <div class="">
            <div
              class="fill-color4 progress"
              style={{
                width: progress[4 - 1],
                backgroundColor: background[4 - 1],
              }}
            >
              <p>Node.js</p>
            </div>
          </div>
          <div class="">
            <div
              class="fill-color5 progress"
              style={{
                width: progress[5 - 1],
                backgroundColor: background[5 - 1],
              }}
            >
              <p>Express</p>
            </div>
          </div>
          <div class="">
            <div
              class="fill-color6 progress"
              style={{
                width: progress[6 - 1],
                backgroundColor: background[6 - 1],
              }}
            >
              <p>Python</p>
            </div>
          </div>
          <div class="">
            <div
              class="fill-color7 progress"
              style={{
                width: progress[7 - 1],
                backgroundColor: background[7 - 1],
              }}
            >
              <p>Algorithm</p>
            </div>
          </div>
          <div class="">
            <div
              class="fill-color8 progress"
              style={{
                width: progress[8 - 1],
                backgroundColor: background[8 - 1],
              }}
            >
              <p>Java</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Skill;
