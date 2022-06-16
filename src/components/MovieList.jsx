import React from 'react';
import MovieListHeading from './MovieListHeading';
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import styled from "styled-components";
import './MovieList.css'

function MovieList(props) {
    const FavouriteComponent = props.favouriteComponent;

    return(
        <div>
            <Wrapper>
                <MovieListHeading heading={props.heading} />
                <Splide options={{
                    perPage: 6,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '1.2rem'
                }}>
                    {props.movies.map((movie) => {
                        return (
                            <SplideSlide key={movie.imdbID} className="img-container">
                                <Card>
                                    <img src={movie.Poster} alt="" />
                                    {/* <Gradient /> */}
                                    <div onClick={() => props.handleFavouritesClick(movie)} className="overlay d-flex align-items-center justify-content-center">
                                        <FavouriteComponent />
                                    </div>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
margin: 2rem;
`;

const Card = styled.div`
min-height: 17rem;
border-radius: 2rem;
overflow: hidden;
position: relative;

img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}
`;

const Gradient = styled.div`
z-index: 3;
position: absolute;
width: 100%;
height: 100%;
background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`


export default MovieList;