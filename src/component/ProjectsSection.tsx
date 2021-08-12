import React from 'react';
import Anime from 'react-anime';
import { InView } from 'react-intersection-observer';
import ai from '../assets/ai.gif';
import card from '../assets/card.gif';

class ProjectsSection extends React.Component<any, any> {
  constructor(props:any) {
    super(props)
    this.state = {
      inView: false,
      animationComplete: false
    }
  }

  setInView = (inView, entry) => {
    const { pageReady, order } = this.props;
    if (pageReady && inView && order === 2 ) {
      this.props.transitionColor(inView, entry)
      this.props.unlockScroll()
      this.setState({
        inView: inView
      })
    } else {
      this.setState({
        inView: inView
      })
    }
  }

  render() {
    const { inView, enableScroll } = this.state
    return(
      <div className="projects-anime-wrapper" id="projects-container" style={{}}>
        <div className="projects-container">
          <InView as="div" id="projects" onChange={(inView, entry) => this.setInView(inView, entry)} trackVisibility={true} delay={1000}>
            <span className="title">Projects</span>
          </InView>
          <div className="showcase-projects-container">
            <a href="https://github.com/pjoe652/Big2-Frontend" className="showcase-project">
              <img src={ai} className="showcase-project"/>
            </a>
            <a href="https://github.com/pjoe652/Computer-Vision-for-Assistive-Technology" className="showcase-project">
              <img src={card} className="showcase-project"/>
            </a>
          </div>
          <span className="sub-title">You can see my other projects on Github</span>
          <div className="links">
            <a href="https://github.com/pjoe652">
              <i className="fab fa-github-square" />
              <span>Github</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectsSection;