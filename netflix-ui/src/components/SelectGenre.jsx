/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../store";

export default function SelectGenre({genres,type}) {
    const dispatch = useDispatch();
    return( 
        <Select className="flex" onChange={e => {
            dispatch(fetchDataByGenre({genre:e.target.value , type}))
        }}>
            {genres.map((genre)=>{
                return(
                    <option value = {genre.id} key = {genre.id}>
                    {genre.name}
                    </option>
                );
            })}
        </Select>
    );
}

// export default function SelectGenre({ genres, type }) {
//     const dispatch = useDispatch();
  
//     const handleGenreChange = (e) => {
//       dispatch(fetchDataByGenre({ genre: e.target.value, type }));
//     };
  
//     return (
//       <Select className="flex" onChange={handleGenreChange}>
//         {genres.map((genre) => (
//           <option value={genre.id} key={genre.id}>
//             {genre.name}
//           </option>
//         ))}
//       </Select>
//     );
//   }


const Select = styled.select`
    margin-left: 5rem;
    cursor: pointer ;
    font-size: 1.2rem;
    background-color: rgba(0,0,0,0.4);
    color: white;

`;