import React, {useEffect, useRef, useMemo} from 'react';
import styled from "styled-components";
import {TimelineLite, Linear} from "gsap";
import style from '/styles/Home.module.scss'

function RunningText() {
    const text = useRef(null)
    useEffect(() => {
        let wrapper = text.current;
        let $list = wrapper.querySelector("ul")
        let $clonedList = $list.cloneNode(true);
        let listWidth = 10;

        $list.querySelectorAll("li").forEach(i => {
            listWidth += i.offsetWidth;
        });

        $list.style.width = `${listWidth}px`;
        $clonedList.style.width = `${listWidth}px`;
        $clonedList.classList.add("cloned");
        wrapper.appendChild($clonedList)

        //TimelineLite
        let infinite = new TimelineLite({repeat: -1, paused: true});
        let time = 12;

        infinite
            .fromTo($list, {rotation: 0.01, x: 0}, {
                force3D: true,
                x: -listWidth,
                ease: Linear.easeNone,
                duration: time
            }, 0)
            .fromTo($clonedList, {rotation: 0.01, x: listWidth}, {
                force3D: true,
                x: 0,
                ease: Linear.easeNone,
                duration: time
            }, 0)
            .set($list, {force3D: true, rotation: 0.01, x: listWidth})
            .to($clonedList, {
                force3D: true,
                rotation: 0.01,
                x: -listWidth,
                ease: Linear.easeNone,
                duration: time
            }, time)
            .to($list, {force3D: true, rotation: 0.01, x: 0, ease: Linear.easeNone, duration: time}, time)
            .progress(1).progress(0)
            .play();
    });

    return (
        <RunningTextWrapper ref={text}>
            <Ul>
                <li><span>ΓΙΩΡΓΟΣ ΤΣΑΝΤΟΥΡΙΑ & ΟΛΙΑ ΚΟΥΡΙΛΟ & </span></li>
            </Ul>
        </RunningTextWrapper>
    )

}
export default React.memo(RunningText)

const RunningTextWrapper = styled.div`
  bottom: 3rem;
  position: absolute;
  overflow: hidden;
  width: 100%;
  z-index: 1;
`

const Ul = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  &.cloned {
    position: absolute;
    top: 0;

    li {
      padding: 0;
    }
  }

  li {
    color: white;
    z-index: 2;
    font-size: 3rem;
    font-weight: 200;
    letter-spacing: 0.2rem;
    word-spacing: 1rem;
    white-space: nowrap;
    padding-right: 20px;
  }
`