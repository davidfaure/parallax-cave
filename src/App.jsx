import './App.scss';
import cave from "./assets/images/cave.png";
import moutain from "./assets/images/mountain.png";

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';

import arrowDown from './assets/images/arrowDown.png';

gsap.registerPlugin(ScrollTrigger);

function App() {

  const caveRef = useRef();
  const mountainRef = useRef();
  const titleRef = useRef();
  const sectionRef = useRef();
  const sunRef = useRef();
  const fadeRef = useRef();
  const scrollRef = useRef();
  const containerRef = useRef();
  const flipRef = useRef();


  const timeline = useRef();

  const [day, setDay] = useState(true);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    setTimeout(() => {

      timeline.current = gsap.timeline({
        defaults: {
          ease: "power2",
        }
      })
        .to(flipRef.current, {
          y: 0,
          duration: 1.2
        })
        .to(containerRef.current, {
          autoAlpha: 0, }, "-=0.1")
        .to(flipRef.current,
          {
            height: 0,
            duration: 1.2
          })
        .to(containerRef.current, { display: 'none' }, "<")
        .from(sunRef.current, {
          autoAlpha: 0,
          top: "100%",
          duration: 1,
        }, "<")
        .from(mountainRef.current, {
          top: "5%",
          duration: 0.5,
        }, "<") // at start of the previous one
        .from(caveRef.current, {
          top: "-2%",
          duration: 0.5,
        }, "<")
        .fromTo(fadeRef.current, {
          bottom: "5%",
          duration: 0.5,
        }, {
          bottom: "15%", 
          duration: 0.5,
        }, "<")
        .fromTo(scrollRef.current, {
          autoAlpha: 0,
          y: 100,
          duration: 0.5,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
        }, "<")
        .eventCallback("onComplete", () => setIntro(false));
    }, 2000)
  }, []);

  useEffect(() => {

    if (!intro) {

      const tl = gsap.timeline();
  
      tl.to(sunRef.current, {
        zIndex: 1,
        // autoAlpha: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          scrub: true,
        }
      })
  
      tl.to(sunRef.current, {
        zIndex: 1,
        top: "80%",
        // autoAlpha: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          scrub: true
        }
      })
        .to(".App", {
          backgroundColor: "#000",
          scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          scrub: true
        }
      })
      .to(mountainRef.current, {
        top: "-5%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top, top",
          // end: "bottom +=1200",
          scrub: true,
        }
    })
      .to(caveRef.current, {
        top: "5% ",
        scale: "1.5",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top, top",
          scrub: true,
        }
      }).to(sunRef.current, {
        // autoAlpha: 0,
        background: day ? "#fff" : '',
        boxShadow: day ? "0px 0px 53px 0px #ffff" : '',
          scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom, top",
          scrub: true,
        }
      }).to(fadeRef.current, {
          autoAlpha: 0,
          scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom, top",
          scrub: true,
        }
      }).to(titleRef.current, {
          left: "-10%",
          scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom, top",
          scrub: true,
        }
      }).to(scrollRef.current, {
          autoAlpha: 0,
          scrollTrigger: {
          trigger: sectionRef.current,
          start: "top",
          scrub: true,
        }
      })
  
      // tl.to(moonRef.current, { top: "40%" }).to(cave.current, { top: "-40%"})
  
      // ScrollTrigger.create({
      //   animation: tl,
      //   trigger: sectionRef.current,
      //   start: "top top",
      //   end: "bottom",
      //   scrub: true,
      //   markers: true
      // })
    }


  }, [intro]);


  return (
    <div className="App">
      <div className="load-container" ref={containerRef}>
        <h1>LOADING...</h1>
      </div>
      <div className="flip2" ref={flipRef} />
      <Header day={day} setDay={setDay} />
      <section ref={sectionRef} >
        <img src={cave} alt="cave" className="cave" draggable="false" ref={caveRef} />
        <img src={moutain} alt="moutain" className="moutain" draggable="false" ref={mountainRef}/>
        <h2 className='Title' ref={titleRef}>{day ? 'Sun' : 'Moon'} light</h2>
        <div className={day ? 'sun' : 'night'} ref={sunRef} />
        <div className={day ? "bottom-fade" : "bottom-fade-night"} ref={fadeRef} />
        <div className="Scrollbar-Container" ref={scrollRef}>
          <p>Explore</p>
          <img src={arrowDown} alt="arrow" draggable="false" />
        </div>
      </section>
      <div className='second'>
        <h2>Exploring Scroll Animation</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum. <br /> <br/> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <br />
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum. <br /> <br/> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <br />
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum. <br /> <br/> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
    </div>
  );
}

export default App;
