import React from 'react';
import MovieList from './MovieList';

function AllMovies(props) {

    return (
        <div>
            <div className='row'>
                <MovieList 
                    heading='Favourites' 
                    movies={props.favMovies} 
                    handleFavouritesClick={props.handleRemoveFavouritesClick} 
                    favouriteComponent={props.removeFavouriteComponent} 
                />
            </div>
            <div className='row'>
                <MovieList 
                    heading='Results' 
                    movies={props.searchMovies} 
                    handleFavouritesClick={props.handleFavouritesClick} 
                    favouriteComponent={props.favouriteComponent} 
                />
            </div>
        </div>
    );
}

export default AllMovies;