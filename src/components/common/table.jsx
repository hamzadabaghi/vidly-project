import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

class Table extends React.Component {
  render() {
    const { data, columns, sortColumn, onSort } = this.props;
    return (
      <table className='table'>
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={data} columns={columns} />
      </table>
    );
  }
}

export default Table;
