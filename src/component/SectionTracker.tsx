import React from 'react';
import Anime from 'react-anime';
import { InView } from 'react-intersection-observer';
import cx from 'classnames';

class SectionTracker extends React.Component<any, any> {
  render() {
    const { sections, order, jumpToSection, toggleOrbit, orbit } = this.props;

    return(
      <div className="section-tracker-container color-transition">
        {
          sections.map((section, i) => 
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
}

export default SectionTracker;