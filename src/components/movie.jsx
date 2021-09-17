import React, { Component } from 'react';
import { getMovies, handleliked } from '../services/fakeMovieService';
import 'bootstrap/dist/css/bootstrap.css';
import Like from './common/like';

class Movie extends Component {
  state = {
    movies: getMovies(),
  };

  handleDeleteMovie = (m) => {
    let movies = this.state.movies.filter((movie) => movie._id !== m._id);
    this.setState({ movies });
  };

  handleReaction = (movie) => {
    let movies = [...this.state.movies];
    let indexMovie = movies.indexOf(movie);
    movies[indexMovie] = { ...movies[indexMovie] };
    movies[indexMovie].liked = !movies[indexMovie].liked;
    this.setState({ movies });
  };
  render() {
    const { length: count } = this.state.movies;
    if (count === 0)
      return <h5 className='p-5'>There are no movies in the database</h5>;

    return (
      <React.Fragment>
        <h5>There are {count} movies in the database</h5>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Title</th>
              <th scope='col'>Genre</th>
              <th scope='col'>Stock</th>
              <th scope='col'>Rate</th>
              <th scope='col'>Reaction</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    like={movie.liked}
                    onClick={() => this.handleReaction(movie)}
                  />
                </td>
                <td>
                  <button
                    className='btn btn-danger btn-sm '
                    key={movie._id}
                    onClick={() => this.handleDeleteMovie(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movie;
