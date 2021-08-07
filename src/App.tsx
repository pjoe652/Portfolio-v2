import React from 'react';
import './App.css';
import AboutMeSection from './component/AboutMeSection';
import WorkSection from './component/WorkSection';
import { a, useSpring } from "@react-spring/three";
import CanvasWrapper from './component/CanvasWrapper';
import LocomotiveScroll from 'locomotive-scroll';
import cx from 'classnames'
import ProjectsSection from './component/ProjectsSection';

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
      backgroundColors: ["#1F2833", "#1A1A1D", "#2A1B3D"],
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
        // console.log("Move Down")
        const nextOrder = order + 1 < sections.length ? order + 1 : order;
        scroll.scrollTo(document.getElementById(`${sections[nextOrder]}-container`), { callback: () => {
          this.setState({
            enableScroll: true
          })
        }})
        this.setState({
          enableScroll: false,
          prevOrder: order,
          order: nextOrder
        })
      } else {
        // Up
        // console.log("Move Up")
        const nextOrder = order - 1 >= 0 ? order - 1 : 0;
        scroll.scrollTo(document.getElementById(`${sections[nextOrder]}-container`), { callback: () => {
          this.setState({
            enableScroll: true
          })
        }})
        this.setState({
          enableScroll: false,
          prevOrder: order,
          order: nextOrder
        })
      }
    }
  }

  transitionColor = (inView, entry) => {
    const { order, sections, prevOrder } = this.state
    let tempPrevOrder = order;
    if (entry && entry.target) {
      // debugger;
      let nextOrder = sections.indexOf(entry.target.id);

      if (inView && tempPrevOrder !== nextOrder) {
        console.log("----------Start---------")
        console.log("Entry: ", entry)
        console.log("Prev: ", tempPrevOrder)
        console.log("Next: ", nextOrder)
        console.log("-----------End----------")
  
        this.setState({
          prevOrder: tempPrevOrder,
          order: nextOrder
        })
      }
    }
  }

  render() {
    const { backgroundColors, order, prevOrder, pageReady } = this.state

    // console.log(prevOrder, order)

    return (
      <div className="portfolio-container color-transition" style={{["--backgroundColorFrom" as any]: backgroundColors[prevOrder], ["--backgroundColorTo" as any]: backgroundColors[order]}} data-scroll-container>
        <CanvasWrapper />
        <AboutMeSection transitionColor={this.transitionColor} pageReady={pageReady} order={order}/>
        <WorkSection transitionColor={this.transitionColor} pageReady={pageReady} order={order}/>
        <ProjectsSection transitionColor={this.transitionColor} pageReady={pageReady} order={order}/>
      </div>
    );
  }
}

export default Portfolio;
