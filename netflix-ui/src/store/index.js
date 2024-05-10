/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";
import {
    configureStore,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";


const initialState = {
    movies: [],
    genresLoaded: false,
    genres: []
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const { 
        data:{genres} 
    } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    // console.log(genres);
    return genres; // Assuming the response structure has a 'genres' key
});


const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name);
        });
        if (movie.backdrop_path) {
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            });
        }
    });
};

const getRawData = async (api, genres, paging) => {
    const moviesArray = [];
    try {
        for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
            const { data: { results } } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
            if (results && Array.isArray(results)) {
                createArrayFromRawData(results, moviesArray, genres);
            } else {
                // Handle unexpected response format
                console.error("Unexpected response format or missing data");
            }
        }
    } catch (error) {
        // Handle errors from the API request
        console.error("Error fetching data:", error);
    }
    return moviesArray; // Move this line outside the loop
};


export const fetchMovies = createAsyncThunk(
    "netflix/trending",
    async ({ type }, thunkApi) => {
        const {
            netflix: { genres }
        } = thunkApi.getState();
        const data = await getRawData(
            `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
            genres,
            true
        );
        // console.log(data);
        return data; // Return the fetched data
    }
);

export const fetchDataByGenre = createAsyncThunk(
    "netflix/moviesByGenres",
    async ({ genre,type }, thunkApi) => {
        // console.log("In fetch data",genre,type)
        const {
            netflix: { genres }
        } = thunkApi.getState();
        const data = await getRawData(
            `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
            genres
        );
        // console.log(data);
        return data; // Return the fetched data
    }
);


const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload; // Update state with fetched movies
        });
        builder.addCase(fetchDataByGenre.fulfilled, (state,action) => {
            state.movies = action.payload;
        });
    },
});


export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});
