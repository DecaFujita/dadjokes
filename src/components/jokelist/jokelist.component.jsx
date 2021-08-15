import React from 'react';
import axios from 'axios';
import Joke from '../joke/joke.component';
import './jokelist.styles.css';

class JokeList extends React.Component {
    static defaultProps = {
        numJokesToGet: 10
    };
    constructor(props) {
        super(props);

        this.state = {
            jokes: [] }
}

  async componentDidMount() {
    let jokes = [];

    while (jokes.length < 10) {
        let response =  await axios.get('https://icanhazdadjoke.com/', {
            headers: {accept: 'application/json'}
        });
        let data = response.data;
        jokes.push({joke: data.joke, id: data.id, score : 0});
    }
    this.setState({jokes: jokes})
}

higherScore = (id) => {
  this.setState({jokes: this.state.jokes.map(joke => {
    if (joke.id === id) {
      return ({...joke, score: joke.score + 1})
    } else {
      return joke
    }
  })})
}

lowerScore = (id) => {
  this.setState({jokes: this.state.jokes.map(joke => {
    if (joke.id === id) {
      return ({...joke, score: joke.score - 1})
    } else {
      return joke
    }
  })})
}

  render() {
    return (
      <div>
        <h1>Dad Jokes</h1>
        <div className='jokelist'>
            {
              this.state.jokes.map(({id, ...otherJokeProps}) =>
                <Joke
                  key={id} 
                  id={id}{...otherJokeProps}
                  higherScore={this.higherScore}
                  lowerScore={this.lowerScore}
                />
              )
            }
        </div>
      </div>
    )
  }
}

export default JokeList;
