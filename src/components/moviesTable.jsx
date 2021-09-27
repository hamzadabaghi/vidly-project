import React from 'react';
import Like from './common/like';
import Table from './common/table';

class MoviesTable extends React.Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (item) => (
        <Like like={item.liked} onClick={() => this.props.onLike(item)} />
      ),
    },
    {
      key: 'delete',
      content: (item) => (
        <button
          className='btn btn-danger btn-sm '
          key={item._id}
          onClick={() => this.props.onDelete(item)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
