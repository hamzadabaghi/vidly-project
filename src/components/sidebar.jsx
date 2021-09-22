import React from 'react';

const Sidebar = ({
  items,
  activeGenre,
  textProperty,
  valueProperty,
  onItemSelected,
}) => {
  return (
    <ul className='list-group'>
      {items.map((genre) => (
        <li
          key={genre[textProperty]}
          className={
            genre[textProperty] === activeGenre.name
              ? 'list-group-item active'
              : 'list-group-item'
          }
          onClick={() => onItemSelected(genre)}
          aria-current='true'
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

Sidebar.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

export default Sidebar;
