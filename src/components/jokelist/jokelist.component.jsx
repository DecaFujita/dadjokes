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

        this.state = { jokes: JSON.parse(window.localStorage.getItem('jokes')) || []};
}

  componentDidMount() {
    if (this.state.jokes.length === 0 ) this.getJokes();
}

getJokes = async () => {
  let jokes = [];

  while (jokes.length < 10) {
      let response =  await axios.get('https://icanhazdadjoke.com/', {
          headers: {accept: 'application/json'}
      });
      let data = response.data;
      jokes.push({joke: data.joke, id: data.id, score : 0});
  }
  this.setState(st => ({jokes: {...st.jokes, jokes}}),() => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)))
}

  handleScore = (id, delta) => {
    this.setState(
      st => ({ 
      jokes: st.jokes.map(joke =>
        joke.id === id ? {...joke, score: joke.score + delta} : joke
    )
  }), () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)))
  }

  addJokes = async () => {
    this.getJokes();
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
                  upScore={() => this.handleScore(id, 1)}
                  downScore={() => this.handleScore(id,-1)}
                />
              )
            }
        </div>
        <button onClick={this.addJokes}>Add new jokes! </button>
      </div>
    )
  }
}

export default JokeList;
