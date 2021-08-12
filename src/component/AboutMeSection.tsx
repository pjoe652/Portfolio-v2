import React from 'react';
import { InView } from 'react-intersection-observer';

interface IAboutMeProps {
  transitionColor: any,
  pageReady: boolean,
  order: number,
  unlockScroll: any
}

class AboutMeSection extends React.Component<IAboutMeProps, {}> {
  setInView = (inView: any, entry: any) => {
    const { pageReady, order } = this.props;
    if (pageReady && inView && order === 2 ) {
      this.props.transitionColor(inView, entry)
      this.props.unlockScroll()
    }
  }

  render() {
    return(
      <div className="aboutme-anime-wrapper" id="aboutme-container">
        <div className="about-me-container">
          <InView as="div" id="aboutme" onChange={(inView, entry) => this.setInView(inView, entry)} trackVisibility={true} delay={100}>
            <span className="title">Hi, I'm Peter</span>
          </InView>
          <span className="sub-title">I'm a fullstack developer from New Zealand</span>
          <div className="links">
            <a href="https://www.linkedin.com/in/peter-joe-17673b186/">
              <i className="fab fa-linkedin" id="linkedin" />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/pjoe652">
              <i className="fab fa-github-square" />
              <span>Github</span>
            </a>
            <a href="mailto: p.joe97@hotmail.com">
              <i className="fas fa-envelope-square" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutMeSection;