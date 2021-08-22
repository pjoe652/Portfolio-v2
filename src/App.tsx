import LocomotiveScroll from 'locomotive-scroll';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import './App.css';
import AboutMeSection from './component/AboutMeSection';
import CanvasWrapper from './component/CanvasWrapper';
import ProjectsSection from './component/ProjectsSection';
import SectionTracker from './component/SectionTracker';
import WorkSection from './component/WorkSection';
import { Desktop, Tablet, TabletLand } from './constants/screenWidth';
import { sectionDetails } from './constants/sectionDetails';

const scroll = new LocomotiveScroll({
  getDirection: true
})

let initialX = null;
let initialY = null;

export default function Portfolio() {
  const [pageOrder, setPageOrder] = useState<any>({
    prevOrder: 0,
    order: 0
  })
  const [enableScroll, setEnableScroll] = useState<boolean>(false)
  const [orbit, setOrbit] = useState<boolean>(false)
  const [viewMode, setViewMode] = useState<string>("desktop")

  function startTouch(e: any) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  };
  
  const moveTouch = useCallback((e: any) => {
    const { order } = pageOrder
    if (initialX === null || initialY === null) {
      return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = (initialX as any) - currentX;
    var diffY = (initialY as any) - currentY;
  
    if (Math.abs(diffX) > Math.abs(diffY)) {} 
    else {
      if (diffY > 0) {
        // Swiped up
        jumpToSection(order + 1 < sectionDetails.length ? order + 1 : order)
      } else {
        // Swiped down
        jumpToSection(order - 1 >= 0 ? order - 1 : 0)
      }  
    }
  
    initialX = null;
    initialY = null;
  
    e.preventDefault();
  }, [pageOrder])

  const scrollToNextElement = useCallback((e: WheelEvent) => {
    const { order } = pageOrder
    if (enableScroll) {
      if (e.deltaY > 0) {
        // Down
        const nextOrder = order + 1 < sectionDetails.length ? order + 1 : order;
        if (nextOrder === order) {
          setEnableScroll(true)
          setPageOrder({
            prevOrder: order,
            order: nextOrder
          })
        } else {
          setEnableScroll(false)
          setPageOrder({
            prevOrder: order,
            order: nextOrder
          })
          scroll.scrollTo(document.getElementById(`${sectionDetails[nextOrder].name}-container`))
        }
      } else {
        // Up
        const nextOrder = order - 1 >= 0 ? order - 1 : 0;
        if (nextOrder === order) {
          setEnableScroll(true)
          setPageOrder({
            prevOrder: order,
            order: nextOrder
          })
        } else {
          setEnableScroll(false)
          setPageOrder({
            prevOrder: order,
            order: nextOrder
          })
          scroll.scrollTo(document.getElementById(`${sectionDetails[nextOrder].name}-container`))
        }
      }
    }
  }, [pageOrder, enableScroll])

  useEffect(() => {
    window.addEventListener("wheel", scrollToNextElement)
    window.addEventListener("touchstart", startTouch, false)
    window.addEventListener("touchmove", moveTouch, false);
    
    updateViewMode()
    window.addEventListener('resize', updateViewMode)

    // Unlock scroll when transitions occur too fast
    var unlockScreenInterval = setInterval(unlockScroll, 1000)
    return() => { 
      window.removeEventListener("wheel", scrollToNextElement)
      window.removeEventListener("touchstart", startTouch, false)
      window.removeEventListener("touchmove", moveTouch, false);
      window.removeEventListener('resize', updateViewMode)
      clearInterval(unlockScreenInterval)
    }

  }, [scrollToNextElement, moveTouch])

  function updateViewMode() {
    if (window.innerWidth < Tablet) {
      setViewMode("tabletSM")
    } else if (window.innerWidth < TabletLand) {
      setViewMode("tablet")
    } else if (window.innerWidth < Desktop){
      setViewMode("desktop")
    } else {
      setViewMode("desktopLg")
    }
  }

  function transitionColor(inView: any, entry: any){
    const { order } = pageOrder
    let tempPrevOrder = order;
    if (entry && entry.target) {
      let nextOrder;
      sectionDetails.find((section, index) => {
        if (section.name === entry.target.id) {
          nextOrder = index
          return true
        }
        return false
      })

      if (inView && tempPrevOrder !== nextOrder) {
        setPageOrder({
          prevOrder: tempPrevOrder,
          order: nextOrder
        })
      }
    }
  }

  function unlockScroll() {
    setEnableScroll(true)
  }

  function jumpToSection(i: number) {
    setEnableScroll(true)
    setPageOrder({
      prevOrder: i,
      order: i
    })

    scroll.scrollTo(document.getElementById(`${sectionDetails[i].name}-container`))
  }

  function toggleOrbit() {
    setOrbit(!orbit)
  }

  return (
    <div className="portfolio-container color-transition" style={{["--backgroundColorFrom" as any]: sectionDetails[pageOrder.prevOrder].backgroundColor, ["--backgroundColorTo" as any]: sectionDetails[pageOrder.order].backgroundColor, ["--fontColor" as any] : sectionDetails[pageOrder.order].fontColor}}>
      <SectionTracker order={pageOrder.order} jumpToSection={jumpToSection} orbit={orbit} toggleOrbit={toggleOrbit} viewMode={viewMode}/>
      <CanvasWrapper order={pageOrder.order} enableScroll={enableScroll} orbit={orbit} viewMode={viewMode}/>
      <AboutMeSection transitionColor={transitionColor} order={pageOrder.order} unlockScroll={unlockScroll}/>
      <WorkSection transitionColor={transitionColor} order={pageOrder.order} unlockScroll={unlockScroll} viewMode={viewMode}/>
      <ProjectsSection transitionColor={transitionColor} order={pageOrder.order} unlockScroll={unlockScroll}/>
      <div className="testingBox"></div>
    </div>
  );
}