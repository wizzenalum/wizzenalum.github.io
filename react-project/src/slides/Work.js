import React, { Component } from "react";
import projects from "../assets/work";

export class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_project: 0,
      show_iframe: false,
    };
  }
  handleCurrentProject = (index) => {
    if (this.current_project !== index) {
      this.setState({ current_project: index, show_iframe: true });
    }
  };
  closeIframe = () => {
    this.setState({ show_iframe: false });
  };
  render() {
    const { current_project, show_iframe } = this.state;
    const viewProject = projects[current_project];

    console.log(projects);
    return (
      <div id="work">
        {show_iframe && (
          <div className="iframe-container">
            <nav className="iframe-nav">
              <div className="links">
                <a href={viewProject.links.youtube} target="blank">
                  youtube
                </a>
                <a href={viewProject.links.github} target="blank">
                  GitHub
                </a>
                <a href={viewProject.links.demo} target="blank">
                  Demo
                </a>
              </div>
              <button className="close" onClick={this.closeIframe}>
                ❌
              </button>
            </nav>
            <iframe
              // width="560"
              // height="315"
              src={viewProject.links.iframe}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        )}
        {!show_iframe && (
          <div className="projectList">
            {projects.map((project, index) => {
              return (
                <div
                  className="project"
                  onClick={() => this.handleCurrentProject(index)}
                  title="click to watch video"
                >
                  <img src={project.thumbnail} alt="thumbnail" />
                  <div className="info">
                    <h3>{project.title}</h3>
                    <p>{project.about}</p>
                    <div>
                      {project.techstack.map((skill) => (
                        <span>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Work;
