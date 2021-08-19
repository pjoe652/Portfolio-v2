import cx from 'classnames';
import React from 'react';
import { sectionDetails } from '../constants/sectionDetails';

interface ISectionTrackerProps {
  jumpToSection: any,
  order: number,
  toggleOrbit: any,
  orbit: boolean
}

export default function SectionTracker(props: ISectionTrackerProps) {
  const { order, jumpToSection, toggleOrbit, orbit } = props;

  return(
    <div className="section-tracker-container color-transition">
      {
        sectionDetails.map((section, i) => 
        <div className={cx({"section-circle color-transition": true, "active": order === i})} onClick={() => jumpToSection(i)}> 
          {i + 1}
        </div>
      )}
      <div className={cx({"section-circle color-transition": true, "active": orbit})} onClick={toggleOrbit}> 
      <i className="fas fa-th" />
      </div>
    </div>
  )
}