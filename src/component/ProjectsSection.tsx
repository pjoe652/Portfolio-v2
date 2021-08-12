import React from 'react';
import { InView } from 'react-intersection-observer';
import ai from '../assets/ai.gif';
import card from '../assets/card.gif';

interface IPortfolioProps {
  transitionColor: any,
  pageReady: boolean,
  order: number,
  unlockScroll: any
}

class ProjectsSection extends React.Component<IPortfolioProps, {}> {
  setInView = (inView: any, entry: any) => {
    const { pageReady, order } = this.props;
    if (pageReady && inView && order === 2 ) {
      this.props.transitionColor(inView, entry)
      this.props.unlockScroll()
    }
  }

  render() {
    return(
      <div className="projects-anime-wrapper" id="projects-container" style={{}}>
        <div className="projects-container">
          <InView as="div" id="projects" onChange={(inView, entry) => this.setInView(inView, entry)} trackVisibility={true} delay={1000}>
            <span className="title">Projects</span>
          </InView>
          <div className="showcase-projects-container">
            <a href="https://github.com/pjoe652/Computer-Vision-for-Assistive-Technology" className="showcase-project">
              <img src={ai} className="showcase-project" alt="ai.png"/>
            </a>
            <a href="https://github.com/pjoe652/Big2-Frontend" className="showcase-project">
              <img src={card} className="showcase-project" alt="cardGame.png"/>
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