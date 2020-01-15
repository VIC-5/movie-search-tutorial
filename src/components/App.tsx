import React , { useEffect , useReducer } from 'react';
import '../css/App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';
import Reducer from '../Reducer';
import { TState } from '../Types';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState : TState =
{
    loading : true ,
    movies : [] ,
    errorMessage : null ,
}

const App = () =>
{
    const [state , dispath] = useReducer(Reducer , initialState);

    useEffect(() => 
    {
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse =>
            {
                dispath
                ({
                    type : "SEARCH_MOVIES_SUCCESS" ,
                    payload : jsonResponse.Search ,
                });
            });
    } , []);

    const search = (searchValue : string) =>
    {
        dispath
        ({
            type : "SEARCH_MOVIES_REQUEST" ,
        });

        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
            .then(response => response.json())
            .then(jsonResponse =>
            {
                if(jsonResponse.Response === "True")
                {
                    dispath
                    ({
                        type : "SEARCH_MOVIES_SUCCESS" ,
                        payload : jsonResponse.Search ,
                    });
                }
                else
                {
                    dispath
                    ({
                        type : "SEARCH_MOVIES_FAILURE" ,
                        error : jsonResponse.Error ,
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
                loading && !errorMessage
                ? <span>loading...</span>
                : errorMessage
                ? <div className="errorMessage">{ errorMessage }</div>
                : movies.map((movie , index) => <Movie key={`${ index }-${ movie.Title }`} movie={ movie } />)
            }
            </div>
        </div>
    );
};

export default App;