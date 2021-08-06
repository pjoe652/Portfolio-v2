import React from 'react';
import './App.css';
import AboutMeSection from './component/AboutMeSection';
import WorkSection from './component/WorkSection';
import { a, useSpring } from "@react-spring/three";
import CanvasWrapper from './component/CanvasWrapper';

class Portfolio extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      prevOrder: 0,
      order: 0,
      sections: ["aboutme", "work"],
      backgroundColors: ["#1F2833", "#1A1A1D"],
    }
  }

  componentDidMount(){
  }


  render() {
    const { backgroundColors, sections } = this.state
    return (
      <div className="portfolio-container">
        <CanvasWrapper backgroundColors={backgroundColors} sections={sections} />
        <AboutMeSection />
        <WorkSection />
      </div>
    );
  }
}

export default Portfolio;
