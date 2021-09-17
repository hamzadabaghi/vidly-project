import React, { Component } from 'react';

class Like extends React.Component {
  render() {
    return (
      <i
        onClick={this.props.onClick}
        style={{ cursor: 'pointer' }}
        className={this.typeClass()}
        aria-hidden='true'
      ></i>
    );
  }
  typeClass = () => {
    return this.props.like ? 'fa fa-heart' : 'fa fa-heart-o';
  };
}

export default Like;
