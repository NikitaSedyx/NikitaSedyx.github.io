'use strict';

import SourceResource from '../resources/sourceResource';
import ArticleResource from '../resources/articleResource';
import articlesTemplate from './articles.pug';

export default class Articles {
	constructor() {
		this.id = `articles-container-${+ new Date()}`;
	}

	getArticlesTemplate() {
		return articlesTemplate(this);
	}

	getArticles(category) {
		let sourceResource = new SourceResource();
		let articleResource = new ArticleResource();

		return sourceResource.load(category)
			.then(sources => {
				let articlePromises = sources.map(({id}) => {
					return articleResource.load(id);
				});
				return Promise.all(articlePromises)
			})
			.then(articleSet => {
				this.articles = [].concat(...articleSet);
				return this.articles;
			})
	}
}
