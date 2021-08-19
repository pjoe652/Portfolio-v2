import cx from 'classnames';
import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';
import { workExperience } from '../constants/workExperience';

interface IWorkProps {
  transitionColor: any,
  order: number,
  unlockScroll: any,
  viewMode: string
}

export default function WorkSection(props: IWorkProps) {
  const [inView, setInView] = useState(false)

  function setInViewChange(inView: boolean, entry: any) {
    const { order } = props;
    if ( inView && order === 1 ) {
      props.transitionColor(inView, entry)
      props.unlockScroll()
    }

    setInView(inView)
  }

  const { viewMode } = props
  return(
    <div className="work-anime-wrapper" id="work-container">
      <div className="work-container">
        <InView as="div" id="work" onChange={(inView, entry) => setInViewChange(inView, entry)} trackVisibility={true} delay={100}>
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