import cx from 'classnames';
import React from 'react';
import { Desktop, DesktopLg } from '../constants/screenWidth';
import { sectionDetails } from '../constants/sectionDetails';

interface ISectionTrackerProps {
  jumpToSection: any,
  order: number,
  toggleOrbit: any,
  orbit: boolean,
  viewMode: string
}

export default function SectionTracker(props: ISectionTrackerProps) {
  const { order, jumpToSection, toggleOrbit, orbit, viewMode } = props;

  return(
    <div className="section-tracker-container color-transition">
      {
        sectionDetails.map((section, i) => 
        <div className={cx({"section-circle color-transition": true, "active": order === i})} onClick={() => jumpToSection(i)}> 
          {
            viewMode === "desktop" || viewMode === "desktopLg" ? i + 1 : ""
          }
        </div>
      )}
      {
        viewMode === "desktop" || viewMode === "desktopLg" ?
          <div className={cx({"section-circle color-transition": true, "active": orbit})} onClick={toggleOrbit}> 
            <i className="fas fa-th" />
          </div>
          :
          <React.Fragment />
      }
    </div>
  )
}