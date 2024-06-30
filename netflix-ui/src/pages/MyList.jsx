/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchMovies, getGenres, getUserLikedMovies } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function MyList() {
   const navigate = useNavigate();
   const [isScrolled, setIsScrolled] = useState(false);
   const movies = useSelector((state) => state.netflix.movies);
   const dispatch = useDispatch();

   const [email, setEmail] = useState(false);
   const [isHover,setIsHover] = useState(false);
 
   onAuthStateChanged(firebaseAuth,(currentUser)=> {
      if(currentUser) setEmail(currentUser.email);
      else navigate("/login");
   });

   useEffect(() => {
      if (email) {
         dispatch(getUserLikedMovies(email));
      }
      },[email])


   window.onscroll =()=>{
      setIsScrolled(window.scrollY === 0 ? false : true);
      return () => (window.onscroll = null);
   };

   
   return <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
         <h1>My list</h1>
         <div className="grid flex">
            {movies.map((movie,index) =>{
               return (
                  <Card
                     movieData={movie} 
                     index={index}
                     key={movie.id}
                     isLiked={true}
                  />
               );
            })}
         </div>
      </div>
   </Container>;
}

const Container = styled.div`
   .content {
      margin: 2.8rem;
      margin-top: 8rem;
      gap: 3rem;
      h1 {
         margin-left: 3rem;
      }
      .grid {
         flex-wrap: wrap;
         gap: 1rem;
      }
   }
`;