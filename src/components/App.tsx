import React , { useState , useEffect } from 'react';
import '../css/App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';
import IMovieProps from '../interface/IMovieProps';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const App = () =>
{
    const [loading , setLoading] = useState(true);
    const [movies , setMovies] = useState<IMovieProps[]>([]);
    const [errorMessage , setErrorMessage] = useState<string | null>(null);

    useEffect(() => 
    {
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse =>
            {
                setMovies(jsonResponse.Search);
                setLoading(false);
            });
    } , []);

    const search = (searchValue : string) =>
    {
        setLoading(true);
        setErrorMessage(null);

        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
            .then(response => response.json())
            .then(jsonResponse =>
            {
                if(jsonResponse.Response === "True")
                {
                    setMovies(jsonResponse.Search);
                    setLoading(false);
                }
                else
                {
                    setErrorMessage(jsonResponse.Error);
                    setLoading(false);
                }
            });
    };

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