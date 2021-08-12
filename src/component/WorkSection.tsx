import React from 'react';
import Anime from 'react-anime';
import cx from 'classnames';
import { InView } from 'react-intersection-observer';
import { workExperience } from '../constants/workExperience';

class WorkSection extends React.Component<any, any> {
  constructor(props:any) {
    super(props)
    this.state = {
      inView: false,
      animationComplete: false
    }
  }

  setInView = (inView, entry) => {
    const { pageReady, order } = this.props;
    if (pageReady && inView && order === 1 ) {
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
      <div className="work-anime-wrapper" id="work-container">
        <div className="work-container">
          <InView as="div" id="work" onChange={(inView, entry) => this.setInView(inView, entry)} trackVisibility={true} delay={100}>
            <span className="title">Work</span>
          </InView>
          <div className={cx({
            "work-experience-section": true,
            "visible": inView
          })}>
            {
              workExperience.map((work, i) => 
                <div className="work-experience" style={{["--delay" as any] : `${i * 0.1 + 0.3}s`}}>
                  {/* <span></span>{`${work.company} | ${work.position} | ${work.timeDuration}`} */}
                  <span>{`${work.company}`}</span> | <span>{`${work.position}`}</span> | <span>{`${work.timeDuration}`}</span>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default WorkSection;