import React from 'react';

function MovieListHeading(props) {
    return(
        <div className='col pb-2'>
            <h4>{props.heading}</h4>
        </div>
    );
}

export default MovieListHeading;