import React from 'react';
import './App.css';
import AboutMeSection from './component/AboutMeSection';
import WorkSection from './component/WorkSection';
import { a, useSpring } from "@react-spring/three";
import CanvasWrapper from './component/CanvasWrapper';
import LocomotiveScroll from 'locomotive-scroll';
import cx from 'classnames'
import ProjectsSection from './component/ProjectsSection';
import SectionTracker from './component/SectionTracker';

const scroll = new LocomotiveScroll({
  getDirection: true
})

class Portfolio extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      prevOrder: 0,
      order: 0,
      sections: ["aboutme", "work", "projects"],
      backgroundColors: ["#1F2833", "#F4976C", "#2A1B3D"],
      fontColors: ["#66FCF1", "#303c6c", "#E98074"],
      scroll: new LocomotiveScroll({
        getDirection: true
      }),
      pageReady: false
    }
  }

  componentDidMount(){
    // scroll.on("scroll", this.scrollToNextElement)
    window.addEventListener("wheel", this.scrollToNextElement)
    this.setState({
      pageReady: true,
      enableScroll: true
    })
  }

  scrollToNextElement = e => {
    const { order, sections, enableScroll } = this.state 
    // console.log(e)
    if (enableScroll) {
      if (e.deltaY > 0) {
        // Down
        const nextOrder = order + 1 < sections.length ? order + 1 : order;
        console.log("----------Start---------")
        console.log("DOWN")
        // console.log("Entry: ", entry.target.id)
        console.log("Prev: ", order)
        console.log("Next: ", nextOrder)
        console.log("-----------End----------")
        this.setState({
          enableScroll: false,
          prevOrder: order,
          order: nextOrder
        })
        scroll.scrollTo(document.getElementById(`${sections[nextOrder]}-container`), { callback: () => {
          this.setState({
            enableScroll: true
          })
        }})
      } else {
        // Up
        const nextOrder = order - 1 >= 0 ? order - 1 : 0;
        console.log("----------Start---------")
        console.log("UP")
        // console.log("Entry: ", entry.target.id)
        console.log("Prev: ", order)
        console.log("Next: ", nextOrder)
        console.log("-----------End----------")
        this.setState({
          enableScroll: false,
          prevOrder: order,
          order: nextOrder
        })
        scroll.scrollTo(document.getElementById(`${sections[nextOrder]}-container`), { callback: () => {
          this.setState({
            enableScroll: true
          })
        }})
      }
    }
  }

  transitionColor = (inView, entry) => {
    const { order, sections, prevOrder } = this.state
    let tempPrevOrder = order;
    if (entry && entry.target) {
      let nextOrder = sections.indexOf(entry.target.id);

      if (inView && tempPrevOrder !== nextOrder) {
        console.log("----------Start-Transition---------")
        console.log("Entry: ", entry.target.id)
        console.log("Prev: ", tempPrevOrder)
        console.log("Next: ", nextOrder)
        console.log("-----------End-Transition----------")
  
        this.setState({
          prevOrder: tempPrevOrder,
          order: nextOrder
        })
      }
    }
  }

  jumpToSection = i => {
    const { sections } = this.state
    this.setState({
      enableScroll: false,
      prevOrder: i,
      order: i
    })
    scroll.scrollTo(document.getElementById(`${sections[i]}-container`), { callback: () => {
      this.setState({
        enableScroll: true
      })
    }})
  }

  render() {
    const { backgroundColors, order, prevOrder, pageReady, sections, fontColors, enableScroll } = this.state
    return (
      <div className="portfolio-container color-transition" style={{["--backgroundColorFrom" as any]: backgroundColors[prevOrder], ["--backgroundColorTo" as any]: backgroundColors[order], ["--fontColor" as any] : fontColors[order]}} data-scroll-container>
        <SectionTracker sections={sections} order={order} jumpToSection={this.jumpToSection}/>
        <CanvasWrapper mainColor={fontColors[order]} subColor={backgroundColors[order]} order={order}/>
        <AboutMeSection transitionColor={this.transitionColor} pageReady={pageReady} order={order} enableScroll={enableScroll}/>
        <WorkSection transitionColor={this.transitionColor} pageReady={pageReady} order={order} enableScroll={enableScroll}/>
        <ProjectsSection transitionColor={this.transitionColor} pageReady={pageReady} order={order} enableScroll={enableScroll}/>
      </div>
    );
  }
}

export default Portfolio;
