import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import 'bootstrap/dist/css/bootstrap.css';
import Pagination from './common/pagination';
import paginate from '../utils/paginate';
import Sidebar from './sidebar';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movie extends Component {
  state = {
    movies: [],
    pageSize: 2,
    currentPage: 1,
    genres: [],
    activeGenre: {
      _id: 0,
      name: 'All Genres',
    },
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

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

  handleGenreSelected = (genre) => {
    this.setState({ activeGenre: genre, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      activeGenre,
      sortColumn,
    } = this.state;

    const filtered =
      activeGenre.name !== 'All Genres'
        ? allMovies.filter((m) => m.genre._id === activeGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    if (count === 0)
      return <h5 className='p-5'>There are no movies in the database</h5>;

    const { pageSize, currentPage, genres, activeGenre, sortColumn } =
      this.state;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className='row'>
        <div className='col-3'>
          <Sidebar
            items={genres}
            onItemSelected={this.handleGenreSelected}
            activeGenre={activeGenre}
            textProperty={'name'}
            valueProperty={'_id'}
          />
        </div>
        <div className='col'>
          <h5>There are {totalCount} movies in the database</h5>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDeleteMovie}
            onLike={this.handleReaction}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />

          <div>
            <nav aria-label='Page navigation example'>
              <ul className='pagination'>
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  onPageChange={this.handlePageChange}
                  currentPage={currentPage}
                />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
