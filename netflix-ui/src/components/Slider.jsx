/* eslint-disable react/prop-types */
import React from "react";
import CardSlider from "./CardSlider";

export default React.memo(function Slider({movies}) {

   const getMoviesFromRange = (from, to) => {
      return movies.slice(from,to);
   }

   return <div>
      <CardSlider title = "Trending Now" data ={getMoviesFromRange(0,10)} />
      <CardSlider title = "Today's Top Picks For You" data ={getMoviesFromRange(10,20)} />
      <CardSlider title = "Your Next Watch" data ={getMoviesFromRange(20,30)} />
      <CardSlider title = "Popular on Netflix" data ={getMoviesFromRange(20,40)} />
      <CardSlider title = "We Think You'll Love These" data ={getMoviesFromRange(40,50)} />
      <CardSlider title = "Exciting Movies" data ={getMoviesFromRange(50,60)} />
   </div>;
});