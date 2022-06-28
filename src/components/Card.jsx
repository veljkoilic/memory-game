import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { CardContext } from "../CardContext"
function Card({id}) {
    const {cardData, setCardData} = useContext(CardContext)
    useEffect(()=>{
        console.log(id + "Is found")
    },[cardData[id].isFound])
    function turn(){
        setCardData(prevCardData=>{
            return [
                ...prevCardData.slice(0, id),
                { ...prevCardData[id], isFlipped: true},

                ...prevCardData.slice(id+1)
                                
            ]
        })
    }   
    const DefaultTurnedStyle = {
        transform: "rotate3d(0,180,0, 0deg)",
        backfaceVisibility: "visible"

    }
    const turnedStyle = {

        transform: "rotate3d(0,1,0, 180deg)",
        


    }
  return (
    <CardDiv className={`card ${cardData[id].isFlipped ? 'turnAround' : 'hidden'}`} style={cardData[id].isFlipped ? turnedStyle : null} onClick={cardData[id].isFound ? ()=>{return false} : turn}>
        <div className="whiteBlock"></div>
        <img style={cardData[id].isFlipped ? DefaultTurnedStyle : turnedStyle} src={cardData[id].img} alt="" />
    </CardDiv>
  )
}

export default Card
const CardDiv = styled.div`
    /* width: 200px; */
    /* height: 250px; */
    max-width: 200px;
    @media only screen and (max-width: 1000px){
        max-width: 150px;

    }
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.46);
    -moz-box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.46);
    box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.46);
    border-radius: 10px;
    background-color: white;
    transition: 1s;
    height: 100%;

    .whiteBlock{
        /* width: 200px; */
        /* height: 250px; */
        background-color: lightsteelblue;
        border-radius: 10px;
        position: absolute;
        transform: rotate3d(0,1,0, 1800deg);
        backface-visibility: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

    }


    img{
        width: 100%;
        padding: 10px;
        object-fit: cover;
        z-index: 1;
        transition: 1s;
        transform: rotate3d(0,1,0, 1800deg);
        backface-visibility: hidden;

    }

`