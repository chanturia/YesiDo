import React, {useEffect, useRef, useMemo} from 'react';
import styled from "styled-components";
import {TimelineLite, Linear ,gsap} from "gsap";
import style from '/styles/Home.module.scss'

function RunningText({string, size, bottom, weight}) {
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
        let infinite = gsap.timeline({repeat: -1, paused: true});
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
        <div className={style.runningTextWrapper} ref={text} style={{bottom: bottom + "rem"}}>
            <Ul weight={weight}>
                <li style={{fontSize: size + "rem"}}><span>{string}</span></li>
            </Ul>
        </div>
    )

}

export default React.memo(RunningText)


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
    //font-size: 3rem;
    font-weight: ${props => props.weight || 500};
    letter-spacing: 0.2rem;
    word-spacing: 1rem;
    white-space: nowrap;
    padding-right: 20px;
  }
`