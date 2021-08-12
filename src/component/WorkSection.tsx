import cx from 'classnames';
import React from 'react';
import { InView } from 'react-intersection-observer';
import { workExperience } from '../constants/workExperience';

interface IWorkState {
  inView: boolean
}

interface IWorkProps {
  transitionColor: any,
  pageReady: boolean,
  order: number,
  unlockScroll: any,
  viewMode: string
}

class WorkSection extends React.Component<IWorkProps, IWorkState> {
  constructor(props:any) {
    super(props)
    this.state = {
      inView: false,
    }
  }

  setInView = (inView: any, entry: any) => {
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
    const { inView } = this.state
    const { viewMode } = this.props
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
                viewMode === "desktop" || viewMode === "tablet" ? 
                  <div className="work-experience" style={{["--delay" as any] : `${i * 0.1 + 0.3}s`}}>
                    <span>{`${work.company}`}</span> | <span>{`${work.position}`}</span> | <span>{`${work.timeDuration}`}</span>
                  </div>
                  :
                  <div className="work-experience" style={{["--delay" as any] : `${i * 0.1 + 0.3}s`}}>
                    <span className="location">{`${work.company}`}</span><br/><span>{`${work.position}`}</span><br/><span>{`${work.timeDuration}`}</span>
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