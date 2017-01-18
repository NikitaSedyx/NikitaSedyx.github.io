'use strict';

import React from 'react';

class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='article'>
        <h4>{this.props.title}</h4>
        <p>{this.props.body}</p>
        <p>{this.props.author}</p>
      </div>
    );
  }
}

export default Article;
