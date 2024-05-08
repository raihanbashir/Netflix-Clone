/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";


export default React.memo(function CardSlider({data,title}) {
   const [showControls, setShowControls]  = useState(false);
   const [SliderPosition, setSliderPosition] = useState(0);
   const listRef = useRef();

//    const handleDirection = (direction) => {
//       const cardWidth = 230; // Width of each card including gap
//       const maxCards = 4; // Maximum visible cards at a time
//       const maxSliderPosition = data.length - maxCards; // Maximum slider position
//       let newPosition = SliderPosition;
  
//       if (direction === "left" && SliderPosition > 0) {
//           newPosition = Math.max(0, SliderPosition - 1);
//       }
//       if (direction === "right" && SliderPosition < maxSliderPosition) {
//           newPosition = Math.min(maxSliderPosition, SliderPosition + 1);
//       }
  
//       const distance = -newPosition * cardWidth; // Calculate distance based on newPosition
//       listRef.current.style.transform = `translateX(${distance}px)`;
//       setSliderPosition(newPosition);
//   };
  

const handleDirection = (direction) => {
   const cardWidth = 230; // Width of each card including gap
   const maxCards = 4; // Maximum visible cards at a time
   const containerWidth = listRef.current.offsetWidth; // Width of the container
   const maxSliderPosition = Math.ceil(data.length / maxCards) - 1; // Maximum slider position
   let newPosition = SliderPosition;

   if (direction === "left" && SliderPosition > 0) {
       newPosition = Math.max(0, SliderPosition - 1);
   }
   if (direction === "right" && SliderPosition < maxSliderPosition) {
       newPosition = Math.min(maxSliderPosition, SliderPosition + 1);
   }

   const distance = -newPosition * cardWidth; // Calculate distance based on newPosition
   const maxDistance = Math.max(0, -((maxSliderPosition * cardWidth) - containerWidth + cardWidth)); // Maximum translation distance

   // Ensure the slider stops when the final card borders reach the right side of the screen
   if (distance > maxDistance) {
       listRef.current.style.transform = `translateX(${maxDistance}px)`;
   } else {
       listRef.current.style.transform = `translateX(${distance}px)`;
   }

   setSliderPosition(newPosition);
};




   return(
      <Container 
         className="flex column"
         onMouseEnter={() => setShowControls(true)}
         onMouseLeave={()=> setShowControls(false)}
      >
         <h1>{title}</h1>
         <div className="wrapper">
            <div 
               className={`slider-action left 
               ${!showControls ? "none":""}
               flex j-center a-center`}
            >
               <AiOutlineLeft onClick={() => handleDirection("left")} />
            </div>
            <div className="flex slider" ref = {listRef}>
               {data.map((movie,index)=> {
                  return <Card movieData = {movie} index={index} key={movie.id} />
               })}
            </div>
            <div 
               className={`slider-action right 
               ${!showControls ? "none":""}
               flex j-center a-center`}
            >
               <AiOutlineRight onClick={() => handleDirection("right")} />
            </div>
         </div>
         
      </Container>
   );
});

const Container = styled.div`
   gap: 1rem;
   position: relative;
   padding: 2rem 0;
   h1{
      margin-left: 50px;
   }
   .wrapper{
      position: relative; /* Add this line */
      .slider{
         width: max-content;
         gap: 1rem;
         transform: translateX(0px);
         transition: 0.3s ease-in-out;
         margin-left: 50px;
         display: flex; /* Add this line */
         align-items: center; /* Add this line */
      }
      .slider-action {
         position: absolute;
         z-index: 99;
         top: 50%; /* Adjusted from 'height: 100%' */
         transform: translateY(-50%); /* Adjusted from 'top: 0; bottom: 0;' */
         width: 50px;
         transition: 0.3s ease-in-out;
         svg{
            font-size: 2rem;
         }
      }  
   }
   .none {
      display: none;
   }
   .left{
      left: 0;
   }
   .right{
      right: 0;
   }
`;


// const Container = styled.div`
//    gap: 1rem;
//    position: relative;
//    padding: 2rem 0;
//    h1{
//       margin-left: 50px;
//    }
//    .wrapper{
//       .slider{
//          width: max-content;
//          gap: 1rem;
//          transform: translateX(0px);
//          transition: 0.3s ease-in-out;
//          margin-left: 50px;

//       }
//       .slider-action {
//          position: absolute;
//          z-index: 99;
//          height: 100%;
//          top: 0;
//          bottom: 0;
//          width: 50px;
//          transition: 0.3s ease-in-out;
//          svg{
//             font-size: 2rem;
//          }
//       }  
//    }
//    .none {
//       display: none;
//    }
//    .left{
//       left: 0;
//    }
//    .right{
//       right: 0;
//    }
// `;