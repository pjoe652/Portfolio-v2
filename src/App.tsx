import LocomotiveScroll from 'locomotive-scroll';
import React from 'react';
import './App.css';
import AboutMeSection from './component/AboutMeSection';
import CanvasWrapper from './component/CanvasWrapper';
import ProjectsSection from './component/ProjectsSection';
import SectionTracker from './component/SectionTracker';
import WorkSection from './component/WorkSection';
import { Tablet, TabletLand } from './constants/screenWidth';

interface IPortfolioState {
  prevOrder: number,
  order: number,
  sections: string[],
  backgroundColors: string[],
  fontColors: string[],
  pageReady: boolean,
  enableScroll: boolean,
  orbit: boolean,
  viewMode: string,
  swipeX: any,
  swipeY: any
}

const scroll = new LocomotiveScroll({
  getDirection: true
})

let initialX = null;
let initialY = null;

class Portfolio extends React.Component<{}, IPortfolioState> {
  constructor(props) {
    super(props);

    this.state = {
      prevOrder: 0,
      order: 0,
      sections: ["aboutme", "work", "projects"],
      backgroundColors: ["#1F2833", "#1A1A1D", "#2A1B3D"],
      fontColors: ["#66FCF1", "#C3073F", "#E98074"],
      pageReady: false,
      enableScroll: false,
      orbit: false,
      viewMode: "desktop",
      swipeX: null,
      swipeY: null
    }
  }

  componentDidMount() {
    window.addEventListener("wheel", this.scrollToNextElement)
    window.addEventListener("touchstart", this.startTouch, false)
    window.addEventListener("touchmove", this.moveTouch, false);

    this.setState({
      pageReady: true,
    })

    this.updateViewMode()
    window.addEventListener('resize', this.updateViewMode)

    // Unlock scroll when transitions occur too fast
    setInterval(this.unlockScroll, 1000)
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

  scrollToNextElement = (e: WheelEvent) => {
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

  transitionColor = (inView: any, entry: any) => {
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

  jumpToSection = (i: number) => {
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

  startTouch = (e: any) => {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  };
  
  moveTouch = (e: any) => {
    if (initialX === null || initialY === null) {
      return;
    }

    const { order, sections } = this.state

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = (initialX as any) - currentX;
    var diffY = (initialY as any) - currentY;
  
    if (Math.abs(diffX) > Math.abs(diffY)) {} 
    else {
      if (diffY > 0) {
        // Swiped up
        this.jumpToSection(order + 1 < sections.length ? order + 1 : order)
      } else {
        // Swiped down
        this.jumpToSection(order - 1 >= 0 ? order - 1 : 0)
      }  
    }
  
    initialX = null;
    initialY = null;
  
    e.preventDefault();
  }

  render() {
    const { backgroundColors, order, prevOrder, pageReady, sections, fontColors, enableScroll, orbit, viewMode } = this.state
    return (
      <div className="portfolio-container color-transition" style={{["--backgroundColorFrom" as any]: backgroundColors[prevOrder], ["--backgroundColorTo" as any]: backgroundColors[order], ["--fontColor" as any] : fontColors[order]}}>
        {
          viewMode === "desktop" || viewMode === "tablet" ?
            <React.Fragment>
              <SectionTracker sections={sections} order={order} jumpToSection={this.jumpToSection} orbit={orbit} toggleOrbit={this.toggleOrbit}/>
            </React.Fragment>
            :
            <React.Fragment />
        }
        <CanvasWrapper mainColor={fontColors[order]} subColor={backgroundColors[order]} order={order} enableScroll={enableScroll} orbit={orbit} viewMode={viewMode}/>
        <AboutMeSection transitionColor={this.transitionColor} pageReady={pageReady} order={order} unlockScroll={this.unlockScroll}/>
        <WorkSection transitionColor={this.transitionColor} pageReady={pageReady} order={order} unlockScroll={this.unlockScroll} viewMode={viewMode}/>
        <ProjectsSection transitionColor={this.transitionColor} pageReady={pageReady} order={order} unlockScroll={this.unlockScroll}/>
        <div className="testingBox"></div>
      </div>
    );
  }
}

export default Portfolio;
