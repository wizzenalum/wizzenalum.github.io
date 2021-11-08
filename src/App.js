import "./style/App.css";
import {
  Instruction,
  Introduction,
  Education,
  Skill,
  Work,
  // Experience,
  // Error,
  Contact,
} from "./slides";
import volume from "./assets/volume.png";
import React, { Component } from "react";
import vatan from "./assets/vatan.mp3";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: 0,
      slides: [Instruction, Introduction, Education, Skill, Work, Contact],
      currentSlide: 0,
      bottomClass: "",
      mute: false,
      audio: null,
      btnColor: ["red", "blue", "pink", "purple"],
      loadedEvents: [],
      auto: true,
    };
  }
  componentDidUpdate(prevState) {
    if (prevState.slideCount !== this.state.slideCount) {
    }
  }
  handleButton = (button, slideNumber) => {
    if (
      button !== "auto" ||
      this.state.currentSlide + 2 > this.state.slides.length
    ) {
      clearInterval(this.state.loadedEvents[0]);
    }
    if (button === "auto") button = "next";

    if (button === "start") this.setState({ currentSlide: 0 });
    else {
      const colors = ["red", "blue", "green", "orange", "pink", "purple"];
      let len = colors.length;
      const rando = () => colors[Math.floor(Math.random() * len)];
      this.setState((prev) => {
        let prevSlide = prev.currentSlide;
        let totalSlide = prev.slides.length;
        let currentSlide = slideNumber;
        let btnColor = prev.btnColor;
        if (button === "next") {
          currentSlide = prevSlide < totalSlide - 1 ? prevSlide + 1 : prevSlide;
          btnColor[0] = rando();
          btnColor[1] = rando();
        }
        if (button === "back") {
          currentSlide = prevSlide > 0 ? prevSlide - 1 : prevSlide;
          btnColor[2] = rando();
          btnColor[3] = rando();
        }
        return {
          currentSlide,
          btnColor,
        };
      });
    }
  };
  toggleMute = () => {
    console.log("toggleMute");
    this.setState((prev) => {
      return { mute: !prev.mute };
    });
  };

  componentDidMount() {
    const id = setInterval(() => {
      this.handleButton("auto");
    }, 15000);
    this.setState((prev) => {
      return { loadedEvents: [...prev.loadedEvents, id] };
    });
    document.addEventListener("wheel", (event) => {
      // console.log(event);

      if (event.timeStamp - this.state.wheelTimeStamp > 1000) {
        if (event.deltaY < 0) {
          console.log("back", event.deltaY, event.timeStamp);
        } else {
          console.log("next", event.deltaY, event.timeStamp);
        }
        this.setState({ wheelTimeStamp: event.timeStamp });
      }
    });
  }

  render() {
    const { currentSlide, slides, mute, btnColor } = this.state;
    const CurrentSlide = slides[currentSlide];
    const muteOpacity = mute ? "1" : "0";
    return (
      <React.Fragment>
        <div className="App">
          {/* top curve of the page */}
          <div className="top-curve curve">
            <audio
              controls
              autoPlay={true}
              muted={mute}
              style={{ opacity: "0" }}
            >
              <source src={vatan} type="audio/mpeg"></source>
            </audio>
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>

          <div className="main">
            {mute ? (
              <button
                className="header-btn btn"
                onClick={this.toggleMute}
                id="vol-btn"
              >
                <div className="unmute" style={{ opacity: muteOpacity }}></div>
                <img src={volume} alt="unmute" />
              </button>
            ) : (
              <button
                className="header-btn btn"
                onClick={this.toggleMute}
                id="vol-btn"
              >
                <div className="unmute" style={{ opacity: muteOpacity }}></div>
                <img src={volume} alt="mute" />
              </button>
            )}
            <div id="logo-container">
              <button
                className="header-btn btn"
                onClick={() => {
                  this.handleButton("start");
                }}
                id="start-btn"
              ></button>
            </div>

            <div
              onClick={() => {
                this.handleButton("next");
              }}
              className="forward-btn"
            >
              <svg
                width="120"
                height="100"
                viewBox="0 0 120 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="triangles">
                  <g id="lightGroup" style={{ fill: btnColor[0] }}>
                    <path
                      id="light1"
                      opacity="0.6"
                      d="M53.4872 46.3509C55.7436 47.6536 55.7436 50.9105 53.4872 52.2132L13.718 75.174C11.4615 76.4767 8.64104 74.8483 8.64104 72.2428L8.64104 26.3213C8.64104 23.7158 11.4616 22.0874 13.718 23.3901L53.4872 46.3509Z"
                    />
                  </g>
                  <g id="darkGroup" style={{ fill: btnColor[1] }}>
                    <path
                      id="dark1"
                      opacity="0.8"
                      d="M74.9231 46.915C77.1795 48.2177 77.1795 51.4746 74.9231 52.7773L34.3077 76.2266C32.0513 77.5294 29.2308 75.9009 29.2308 73.2955L29.2308 26.3968C29.2308 23.7914 32.0513 22.1629 34.3077 23.4657L74.9231 46.915Z"
                    />
                    <path
                      id="dark2"
                      opacity="0.8"
                      d="M54.6154 46.915C56.8718 48.2177 56.8718 51.4746 54.6154 52.7773L14 76.2266C11.7436 77.5294 8.92307 75.9009 8.92307 73.2955L8.92308 26.3968C8.92308 23.7914 11.7436 22.1629 14 23.4657L54.6154 46.915Z"
                    />
                  </g>
                </g>
              </svg>
            </div>

            <div
              onClick={() => {
                this.handleButton("back");
              }}
              className="backward-btn"
            >
              <svg
                width="120"
                height="100"
                viewBox="0 0 120 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="triangles">
                  <g id="lightGroup" style={{ fill: btnColor[2] }}>
                    <path
                      id="light1"
                      opacity="0.6"
                      d="M53.4872 46.3509C55.7436 47.6536 55.7436 50.9105 53.4872 52.2132L13.718 75.174C11.4615 76.4767 8.64104 74.8483 8.64104 72.2428L8.64104 26.3213C8.64104 23.7158 11.4616 22.0874 13.718 23.3901L53.4872 46.3509Z"
                    />
                  </g>
                  <g id="darkGroup" style={{ fill: btnColor[3] }}>
                    <path
                      id="dark1"
                      opacity="0.8"
                      d="M74.9231 46.915C77.1795 48.2177 77.1795 51.4746 74.9231 52.7773L34.3077 76.2266C32.0513 77.5294 29.2308 75.9009 29.2308 73.2955L29.2308 26.3968C29.2308 23.7914 32.0513 22.1629 34.3077 23.4657L74.9231 46.915Z"
                    />
                    <path
                      id="dark2"
                      opacity="0.8"
                      d="M54.6154 46.915C56.8718 48.2177 56.8718 51.4746 54.6154 52.7773L14 76.2266C11.7436 77.5294 8.92307 75.9009 8.92307 73.2955L8.92308 26.3968C8.92308 23.7914 11.7436 22.1629 14 23.4657L54.6154 46.915Z"
                    />
                  </g>
                </g>
              </svg>
            </div>

            <div className="slide-container">
              <CurrentSlide handleButton={this.handleButton} mute={mute} />
            </div>
            <div id="social-media-container">
              <li className="youtube">
                <a href="https://www.youtube.com/channel/UCyW_hKyBcj6Rya4aPMrJH9A">
                  <img src="/icons/youtube-logo-white.png" alt="youtube" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/WizzenAlum/">
                  <img src="/icons/facebook-logo-white.png " alt="facebook" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ghanshyam-530883117/">
                  <img src="/icons/linkedin-logo-white.png" alt="" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/wizzenalum">
                  <img src="/icons/twitter-white-logo.png" alt=" twitter" />
                </a>
              </li>
            </div>
          </div>

          <div className="bottom-curve curve">
            <svg
              id="visual"
              viewBox="0 0 900 150"
              width="900"
              height="150"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
            >
              <path
                d="M0 143L5 139.3C10 135.7 20 128.3 30 126.7C40 125 50 129 60 131.3C70 133.7 80 134.3 90 128.5C100 122.7 110 110.3 120 103.7C130 97 140 96 150 102C160 108 170 121 180 122.2C190 123.3 200 112.7 210 109.8C220 107 230 112 240 116.2C250 120.3 260 123.7 270 122C280 120.3 290 113.7 300 109.8C310 106 320 105 330 111C340 117 350 130 360 136.7C370 143.3 380 143.7 390 135.5C400 127.3 410 110.7 420 107.2C430 103.7 440 113.3 450 120.2C460 127 470 131 480 129.7C490 128.3 500 121.7 510 121.7C520 121.7 530 128.3 540 125.7C550 123 560 111 570 104.2C580 97.3 590 95.7 600 98.8C610 102 620 110 630 118.5C640 127 650 136 660 132.3C670 128.7 680 112.3 690 106.3C700 100.3 710 104.7 720 109.3C730 114 740 119 750 122.2C760 125.3 770 126.7 780 122.7C790 118.7 800 109.3 810 110.8C820 112.3 830 124.7 840 127.7C850 130.7 860 124.3 870 120.5C880 116.7 890 115.3 895 114.7L900 114L900 151L895 151C890 151 880 151 870 151C860 151 850 151 840 151C830 151 820 151 810 151C800 151 790 151 780 151C770 151 760 151 750 151C740 151 730 151 720 151C710 151 700 151 690 151C680 151 670 151 660 151C650 151 640 151 630 151C620 151 610 151 600 151C590 151 580 151 570 151C560 151 550 151 540 151C530 151 520 151 510 151C500 151 490 151 480 151C470 151 460 151 450 151C440 151 430 151 420 151C410 151 400 151 390 151C380 151 370 151 360 151C350 151 340 151 330 151C320 151 310 151 300 151C290 151 280 151 270 151C260 151 250 151 240 151C230 151 220 151 210 151C200 151 190 151 180 151C170 151 160 151 150 151C140 151 130 151 120 151C110 151 100 151 90 151C80 151 70 151 60 151C50 151 40 151 30 151C20 151 10 151 5 151L0 151Z"
                fill="#080263"
                stroke-linecap="round"
                stroke-linejoin="miter"
              ></path>
            </svg>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
