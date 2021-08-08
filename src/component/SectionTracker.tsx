import React from 'react';
import Anime from 'react-anime';
import { InView } from 'react-intersection-observer';
import cx from 'classnames';

class SectionTracker extends React.Component<any, any> {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { sections, order, jumpToSection } = this.props;

    return(
      <div className="section-tracker-container color-transition">
        {
          sections.map((section, i) => 
          <div className={cx({"section-circle": true, "active": order === i})} onClick={() => jumpToSection(i)}> 
            {i + 1}
          </div>
        )}
      </div>
    )
  }
}

export default SectionTracker;