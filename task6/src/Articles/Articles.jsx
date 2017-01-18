'use strict';

import React from 'react';

import http from '../shared/http';

import Article from './Article';

class Articles extends React.Component {
  constructor(props) {
    super(props);

    this.isLoading = {
      articles: true
    };
    this.articles = [];

    this.state = {
      isLoading: this.isLoading
    };
  }

  componentWillMount() {
    http.get('http://localhost:3000/api/v1/Article')
      .then((articles) => {
        this.isLoading.articles = false;
        this.articles = articles;
        this.setState({
          isLoading: this.isLoading
        })
      })
      .catch((articles) => {
        this.isLoading.articles = false;
        this.setState({
          isLoading: this.isLoading
        })
      })
  }

  render() {
    let articles = [];
    this.articles.forEach((article) => {
      articles.push(<Article key={article._id} title={article.title} body={article.body} author={article.author.email}></Article>);
    });
    return (
      <div className='articles'>
        {articles}
      </div>
    );
  }
}

export default Articles;
