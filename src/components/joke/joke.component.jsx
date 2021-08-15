import React from 'react';

import './joke.styles.css';

const Joke = props => {
    let colour = () => {
        if (props.score < 0) {
            return 'red'
        } else if (props.score === 0) { //0
            return 'orange'
        } else if (props.score > 0 && props.score < 3) { //1, 2
            return 'lime'
        } else if (props.score > 2 && props.score < 5) { //3,4
            return 'lightgreen'
        } else { // 5+
            return 'green'
        }
    }

    return(
        <div className='joke'>
            <div className='joke-score'>
                <i className="fas fa-long-arrow-alt-up joke-icon" onClick={()=>props.higherScore(`${props.id}`)} />
                <p
                    className='joke-scoreNumber'
                    style={{border: `2px solid ${colour()}`}}
                >{props.score}</p>
                <i className="fas fa-long-arrow-alt-down joke-icon" onClick={()=>props.lowerScore(`${props.id}`)} />
            </div>
            <div className='joke-joke'>{props.joke}</div>
        </div>
    )

}

export default Joke;