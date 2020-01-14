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
<<<<<<< HEAD
=======
    //const [loading , setLoading] = useState(true);
    //const [movies , setMovies] = useState<IMovieProps[]>([]);
    //const [errorMessage , setErrorMessage] = useState<string | null>(null);
>>>>>>> d670f76f1d21d8b8d9b814991a82fccf6df9b0c9

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
<<<<<<< HEAD
=======
                //setMovies(jsonResponse.Search);
                //setLoading(false);
>>>>>>> d670f76f1d21d8b8d9b814991a82fccf6df9b0c9
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
<<<<<<< HEAD
=======
        //setLoading(true);
        //setErrorMessage(null);
>>>>>>> d670f76f1d21d8b8d9b814991a82fccf6df9b0c9

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
<<<<<<< HEAD
=======
                    //setMovies(jsonResponse.Search);
                    //setLoading(false);
>>>>>>> d670f76f1d21d8b8d9b814991a82fccf6df9b0c9
                }
                else
                {
                    dispath
                    ({
                        type : "SEACH_MOVIES_FAILURE" ,
                        payload : [] ,
                        error : jsonResponse.Error
                    });
<<<<<<< HEAD
=======
                    //setErrorMessage(jsonResponse.Error);
                    //setLoading(false);
>>>>>>> d670f76f1d21d8b8d9b814991a82fccf6df9b0c9
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