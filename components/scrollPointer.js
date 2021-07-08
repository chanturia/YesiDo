import React, {useContext, useEffect, useRef, useState} from "react";
import styled from 'styled-components'
import {Context} from "/store/Store";

const ScrollPointer = styled.div`
  position: fixed;
  top: -110px;
  left: -110px;
  z-index: 999999;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: white;
  pointer-events: none;
  display: ${props => props.hidden ? "none" : "unset"};
  cursor: ${props => props.hidden ? "none" : "unset"};

`
export default function scrollPointer() {
    const mainContainerRef = useRef()
    const [hidden, setHidden] = useState(false)
    const [state, dispatch] = useContext(Context);


    const mouseX = (event) => {
        return event.clientX;
    };

    const mouseY = (event) => {
        return event.clientY;
    };

    const positionElement = (event) => {
        let mouse;
        mouse = {
            x: mouseX(event),
            y: mouseY(event)
        };
        mainContainerRef.current.style.top = mouse.y + 1 + 'px';
        return mainContainerRef.current.style.left = mouse.x + 1 + 'px';
    };

    let timer = false;

    useEffect(() => {
        if (state.modalState.isActive) {
            setHidden(true)
        }
    }, [state.modalState.isActive])
    useEffect(() => {
        if (state.modalState.isActive || hidden) {
            document.getElementsByTagName('html')[0].style.cursor = ''
        } else {
            document.getElementsByTagName('html')[0].style.cursor = 'none'
        }
    }, [hidden, state.modalState.isActive])

    useEffect(() => {
        window.onmousemove = (event) => {
            if (state.modalState.isActive) {
                return
            }
            let _event;
            _event = event;
            const hasPointer = event.path.filter(element => {
                if (element instanceof HTMLElement) {
                    let styles = window.getComputedStyle(element)
                    if (styles.cursor === 'pointer') {
                        return true
                    }
                }
            })
            setHidden(hasPointer.length > 0)
            return timer = setTimeout(() => {
                return positionElement(_event);
            }, 1);
        };
    }, [])
    return (
        <ScrollPointer ref={mainContainerRef} hidden={hidden}>
            {!state.modalState.isActive &&
            <span>scroll</span>
            }
        </ScrollPointer>
    )
}