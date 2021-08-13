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
            jokes: [
              
            ] }
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

  render() {
    return (
      <div>
        <h1>Dad Jokes</h1>
        <div className='jokelist'>
            {
                this.state.jokes.map(joke => <Joke key={joke.id} joke={joke.joke} score={joke.score}/>)
            }
        </div>
      </div>
    )
  }
}

export default JokeList;
