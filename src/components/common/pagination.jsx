import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pagesCount = itemsCount / pageSize;
  const pages = _.range(1, pagesCount + 1);
  if (pagesCount <= 1) return null;

  return pages.map((page) => (
    <li
      key={page}
      className={page === currentPage ? 'page-item active' : 'page-item'}
      style={{ padding: 2 }}
    >
      <button className='page-link' onClick={() => onPageChange(page)}>
        {page}
      </button>
    </li>
  ));
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Pagination;
