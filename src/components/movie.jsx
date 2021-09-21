import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import 'bootstrap/dist/css/bootstrap.css';
import Like from './common/like';
import Pagination from './common/pagination';
import paginate from '../utils/paginate';

class Movie extends Component {
  state = {
    movies: getMovies(),
    pageSize: 5,
    currentPage: 1,
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const { length: count } = this.state.movies;
    if (count === 0)
      return <h5 className='p-5'>There are no movies in the database</h5>;

    const { movies: allMovies, pageSize, currentPage } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);

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
            {movies.map((movie) => (
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

        <div>
          <nav aria-label='Page navigation example'>
            <ul className='pagination'>
              <Pagination
                itemsCount={allMovies.length}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Movie;
