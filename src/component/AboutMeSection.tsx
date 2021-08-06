import React from 'react';
import Anime from 'react-anime';

class AboutMeSection extends React.Component<any, any> {
  render() {
    return(
      <div className="aboutme-anime-wrapper" id="aboutme">
        <Anime 
            className="anime-container "
            opacity={[0, 1]}
            translateY={'2em'}
            delay={250}
            easing="easeOutElastic"
            scale={[.75, 1]}>
          <div className="about-me-container">
            <span className="title">Hi, I'm Peter</span>
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
        </Anime>
      </div>
    )
  }
}

export default AboutMeSection;