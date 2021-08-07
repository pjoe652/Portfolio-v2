import React from 'react';
import Anime from 'react-anime';
import { InView } from 'react-intersection-observer';

class ProjectsSection extends React.Component<any, any> {
  constructor(props:any) {
    super(props)
    this.state = {
      inView: false,
      animationComplete: false
    }
  }

  setInView = (inView, entry) => {
    const { pageReady } = this.props;
    // debugger;
    if (pageReady && inView) {
      this.props.transitionColor(inView, entry)
      this.setState({
        inView: inView
      })
    } else {
      this.setState({
        inView: inView
      })
    }
  }

  completeAnimationInView = (a) => {
    const { inView, animationComplete } = this.state
    if (inView && !animationComplete) {
      a.restart();

      this.setState({
        animationComplete: true
      })
    }
  }

  render() {
    const { inView } = this.state
    console.log("Projects: ", inView)
    return(
      <div className="aboutme-anime-wrapper" id="projects-container">
        {
          inView ? 
          <Anime 
            className="anime-container "
            opacity={[0, 1]}
            translateY={'2em'}
            delay={500}
            easing="easeOutElastic"
            scale={[.75, 1]}
            // complete={(a) => this.completeAnimationInView(a)}
            >
            <div className="about-me-container">
              <InView as="div" id="projects" onChange={(inView, entry) => this.setInView(inView, entry)} trackVisibility={true} delay={100}>
                <span className="title">Projects</span>
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
          </Anime> :
          <div className="about-me-container hidden">
            <InView as="div" id="projects" onChange={(inView, entry) => this.setInView(inView, entry)}>
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
        }
        {/* <Anime 
            className="anime-container "
            opacity={[0, 1]}
            translateY={'2em'}
            delay={500}
            easing="easeOutElastic"
            scale={[.75, 1]}
            play={(a) => console.log(a)}
            complete={(a) => this.completeAnimationInView(a)}>
          <div className="about-me-container">
            <InView as="div" id="projects" onChange={(inView, entry) => this.setInView(inView, entry)}>
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
        </Anime> */}
      </div>
    )
  }
}

export default ProjectsSection;