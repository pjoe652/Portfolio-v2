import React from 'react';
import './App.css';
import AboutMeSection from './component/AboutMeSection';
import WorkSection from './component/WorkSection';
import { a, useSpring } from "@react-spring/three";
import CanvasWrapper from './component/CanvasWrapper';
import LocomotiveScroll from 'locomotive-scroll';
import cx from 'classnames'
import { Tablet, TabletLand } from './constants/screenWidth';
import ProjectsSection from './component/ProjectsSection';
import SectionTracker from './component/SectionTracker';

interface IPortfolioState {
  prevOrder: number,
  order: number,
  sections: string[],
  backgroundColors: string[],
  fontColors: string[],
  pageReady: boolean,
  enableScroll: boolean,
  orbit: boolean,
  viewMode: string
}

const scroll = new LocomotiveScroll({
  getDirection: true
})

class Portfolio extends React.Component<{}, IPortfolioState> {
  constructor(props) {
    super(props);

    this.state = {
      prevOrder: 0,
      order: 0,
      sections: ["aboutme", "work", "projects"],
      backgroundColors: ["#1F2833", "#F4976C", "#2A1B3D"],
      fontColors: ["#66FCF1", "#303c6c", "#E98074"],
      pageReady: false,
      enableScroll: false,
      orbit: false,
      viewMode: "desktop",
    }
  }

  componentDidMount(){
    window.addEventListener("wheel", this.scrollToNextElement)
    this.setState({
      pageReady: true,
    })

    this.updateViewMode()
    window.addEventListener('resize', this.updateViewMode)

    // Unlock scroll when transitions occur too fast
    setInterval(this.unlockScroll, 3000)
  }

  

  updateViewMode = () => {
    if (window.innerWidth < Tablet) {
      this.setState({
        viewMode: "tabletSM"
      })
    } else if (window.innerWidth < TabletLand) {
      this.setState({
        viewMode: "tablet",
      })
    } else {
      this.setState({
        viewMode: "desktop",
      })
    }
  }

  scrollToNextElement = e => {
    const { order, sections, enableScroll } = this.state 
    if (enableScroll) {
      if (e.deltaY > 0) {
        // Down
        const nextOrder = order + 1 < sections.length ? order + 1 : order;
        if (nextOrder === order) {
          this.setState({
            enableScroll: true,
            prevOrder: order,
            order: nextOrder,
          })
        } else {
          this.setState({
            enableScroll: false,
            prevOrder: order,
            order: nextOrder,
          })
          scroll.scrollTo(document.getElementById(`${sections[nextOrder]}-container`))
        }
      } else {
        // Up
        const nextOrder = order - 1 >= 0 ? order - 1 : 0;
        if (nextOrder === order) {
          this.setState({
            enableScroll: true,
            prevOrder: order,
            order: nextOrder,
          })
        } else {
          this.setState({
            enableScroll: false,
            prevOrder: order,
            order: nextOrder,
          })
          scroll.scrollTo(document.getElementById(`${sections[nextOrder]}-container`))
        }
      }
    }
  }

  transitionColor = (inView, entry) => {
    const { order, sections } = this.state
    let tempPrevOrder = order;
    if (entry && entry.target) {
      let nextOrder = sections.indexOf(entry.target.id);

      if (inView && tempPrevOrder !== nextOrder) {
        this.setState({
          prevOrder: tempPrevOrder,
          order: nextOrder,
        })
      }
    }
  }

  unlockScroll = () => {
    this.setState({
      enableScroll: true,
    })
  }

  jumpToSection = i => {
    const { sections } = this.state
    this.setState({
      enableScroll: false,
      prevOrder: i,
      order: i
    })
    scroll.scrollTo(document.getElementById(`${sections[i]}-container`))
  }

  toggleOrbit = () => {
    this.setState({
      orbit: !this.state.orbit
    })
  }

  // startTouch = (e) => {
  //   initialX = e.touches[0].clientX;
  //   initialY = e.touches[0].clientY;
  // };
  
  // moveTouch = (e) => {
  //   if (initialX === null || initialY === null) {
  //     return;
  //   } else {
  //     var currentX = e.touches[0].clientX;
  //     var currentY = e.touches[0].clientY;
    
  //     var diffX = initialX - currentX;
  //     var diffY = initialY - currentY;
    
  //     if (Math.abs(diffX) > Math.abs(diffY)) {
  //       // sliding horizontally
  //       if (diffX > 0) {
  //         // swiped left
  //         console.log("swiped left");
  //       } else {
  //         // swiped right
  //         console.log("swiped right");
  //       }  
  //     } else {
  //       // sliding vertically
  //       if (diffY > 0) {
  //         // swiped up
  //         console.log("swiped up");
  //       } else {
  //         // swiped down
  //         console.log("swiped down");
  //       }  
  //     }
    
  //     initialX = null;
  //     initialY = null;
    
  //     e.preventDefault();
  //   }
  // }

  render() {
    const { backgroundColors, order, prevOrder, pageReady, sections, fontColors, enableScroll, orbit, viewMode } = this.state
    return (
      <div className="portfolio-container color-transition" style={{["--backgroundColorFrom" as any]: backgroundColors[prevOrder], ["--backgroundColorTo" as any]: backgroundColors[order], ["--fontColor" as any] : fontColors[order]}} data-scroll-container>
        {
          viewMode === "desktop" || viewMode === "tablet" ?
            <SectionTracker sections={sections} order={order} jumpToSection={this.jumpToSection} orbit={orbit} toggleOrbit={this.toggleOrbit}/>
            :
            <React.Fragment />

        }
        <CanvasWrapper mainColor={fontColors[order]} subColor={backgroundColors[order]} order={order} enableScroll={enableScroll} orbit={orbit} viewMode={viewMode}/>
        <AboutMeSection transitionColor={this.transitionColor} pageReady={pageReady} order={order} enableScroll={enableScroll} unlockScroll={this.unlockScroll}/>
        <WorkSection transitionColor={this.transitionColor} pageReady={pageReady} order={order} enableScroll={enableScroll} unlockScroll={this.unlockScroll}/>
        <ProjectsSection transitionColor={this.transitionColor} pageReady={pageReady} order={order} enableScroll={enableScroll} unlockScroll={this.unlockScroll}/>
      </div>
    );
  }
}

export default Portfolio;
