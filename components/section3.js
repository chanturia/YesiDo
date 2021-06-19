import React from 'react';
import style from '/styles/Home.module.scss'
import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
`

const Text1 = styled.div`
  font-size: 2.7rem;
  font-weight: 300;
  margin: 27px 0px 0px 16px;
  letter-spacing: -3px;
`;
const Text2 = styled.div`
  font-size: 4.3rem;
  font-weight: 500;
  margin: 13px 0px 0px 16px;
  letter-spacing: -3px;
`;

const Text3 = styled.div`
  font-size: 3.2rem;
  font-weight: 400;
  margin: 13px 0 0 16px;
  letter-spacing: -3px;`;

const MapWrapper = styled.div`
  display: flex;
  align-items: center;
`
const Map = styled.div`
  border: 3px solid #274d4e;
  border-radius: 50%;
  height: 6rem;
  width: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
  margin-left: 7rem;
  cursor: pointer;
  transition: all .4s;
  
  :hover{
    background: #274d4e;
    color: white;
  }
`
export default function section3() {
    return (
        <MainDiv className={style.firstState}>
            <div>
                <Text1>Κέντρο</Text1>
                <Text2>Ypanema</Text2>
                <Text3>Λουτράκι</Text3>
            </div>
            <MapWrapper>
                <Map onClick={()=>{alert("open Mao")}}>
                    <span>Map</span>
                </Map>
            </MapWrapper>
        </MainDiv>
    )
}
