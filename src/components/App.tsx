import React , { useState , useEffect , useReducer } from 'react';
import '../css/App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';
import IMovieProps from '../interface/IMovieProps';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

type reducerState =
{
    loading : boolean ,
    movies : IMovieProps[] ,
    errorMessage : string | null;
};

type action =
{
    type : string ,
    payload : IMovieProps[]
    error : string | null
};

const initialState : reducerState =
{
    loading : true ,
    movies : [] ,
    errorMessage : null
};

const reducer = (state : reducerState , action : action) =>
{
    switch (action.type)
    {
        case "SEARCH_MOVIES_REQUEST" :
            return {
                ...state ,
                loading : true ,
                errorMessage : null
            };
        case "SEARCH_MOVIES_SUCCESSS" :
            return {
                ...state ,
                loading : false ,
                movies : action.payload
            };
        case "SERACH_MOVIES_FAILURE" :
            return {
                ...state ,
                loading : false ,
                errorMessage : action.error
            };
        default :
            return state;
    };
};

const App = () =>
{
    const [state , dispath] = useReducer(reducer , initialState);

    useEffect(() => 
    {
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse =>
            {
                dispath
                ({
                    type : "SEARCH_MOVIES_SUCCESSS" ,
                    payload : jsonResponse.Search ,
                    error : null
                });
            });
    } , []);

    const search = (searchValue : string) =>
    {
        dispath
        ({
            type : "SEARCH_MOVIES_REQUEST" ,
            payload : [] ,
            error : null
        });

        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
            .then(response => response.json())
            .then(jsonResponse =>
            {
                if(jsonResponse.Response === "True")
                {
                    dispath
                    ({
                        type : "SEARCH_MOVIES_SUCCESSS" ,
                        payload : jsonResponse.Search ,
                        error : null
                    });
                }
                else
                {
                    dispath
                    ({
                        type : "SEACH_MOVIES_FAILURE" ,
                        payload : [] ,
                        error : jsonResponse.Error
                    });
                }
            });
    };

    const { movies , errorMessage , loading } = state;

    return (
        <div className="App">
            <Header text="MOVIE GALLERY" />
            <Search search = { search } />
            <p className="App-intro">Favourite movies</p>
            <div className="movies">
                {
                    loading && !errorMessage ? (
                        <span>loading...</span>
                    ) : errorMessage ? (
                        <div className="errorMessage">{ errorMessage }</div>
                    ) : (
                        movies.map((movie , index) => (
                            <Movie
                                key={`${ index }-${ movie.Title }`}
                                movie={ movie }
                            />
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default App;