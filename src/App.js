import React, {useState, useEffect} from 'react';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AllMovies from './components/AllMovies';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [trigger, setTrigger] = useState('false');
  const [favourites, setFavourites] = useState([]);

  async function getMovieRequest(search) {
    const url = `http://www.omdbapi.com/?s=${search}&apikey=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if(trigger) {
      setTrigger('false');
    }
    // console.log(trigger);
    // console.log(responseJson);
    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }
  }

  useEffect(()=>{
    getMovieRequest(search);
  },[trigger]); //We don't want to trigger at the first load, but only when both trigger and search variables change, we should use useRef & useEffect to fix it

  useEffect(()=>{
    const movieFavourites = JSON.parse(localStorage.getItem('newflix-favourites')) //We use the localStorage key to retreive the items
    setFavourites(movieFavourites);
   }, []); //Trigger on window load

  function saveToLocalStorage(items) {
    localStorage.setItem('newflix-favourites',JSON.stringify(items));
  }

  function addFavouriteMovie(movie) {
    if (favourites.includes(movie) || JSON.stringify(localStorage).indexOf(`${movie.imdbID}`) >= 0) {
      console.log(favourites.includes(movie));
    }
    else {
      const newFavouriteList=[...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }
  }

  function removeFavouriteMovie(movie) {
    const newFavouriteList= favourites.filter((favorite)=> favorite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4'>
        <div className='col'>
          <h1>Newflix</h1>
        </div>
        <SearchBox 
          search={search} 
          setSearch={setSearch} 
          setTrigger={setTrigger}
        />
      </div>
      <AllMovies 
        searchMovies={movies} 
        favMovies={favourites} 
        handleFavouritesClick={addFavouriteMovie} 
        handleRemoveFavouritesClick={removeFavouriteMovie}
        favouriteComponent={AddFavourites} 
        removeFavouriteComponent={RemoveFavourites}
      />
    </div>
  );
}

export default App;
