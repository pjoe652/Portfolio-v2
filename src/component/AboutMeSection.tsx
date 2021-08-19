import React from 'react';
import { InView } from 'react-intersection-observer';

interface IAboutMeProps {
  transitionColor: any,
  order: number,
  unlockScroll: any
}

export default function AboutMeSection(props: IAboutMeProps) {
  function setInView(inView: any, entry: any){
    const { order } = props;
    if (inView && order === 0 ) {
      props.transitionColor(inView, entry)
      props.unlockScroll()
    }
  }

  return(
    <div className="aboutme-anime-wrapper" id="aboutme-container">
      <div className="about-me-container">
        <InView as="div" id="aboutme" onChange={(inView, entry) => setInView(inView, entry)} trackVisibility={true} delay={100}>
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