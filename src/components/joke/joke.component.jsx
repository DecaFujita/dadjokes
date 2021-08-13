import React from 'react';

import './joke.styles.css';

const Joke = props => {
    return(
        <div className='joke'>
            <div className='joke-score'>
                <spam className='icon icon-up'></spam>
                     {props.score}
                <spam className='icon icon-down'></spam>
            </div>
            <div classname='joke-joke'>{props.joke}</div>
        </div>
    )

}

export default Joke;