'use strict';

import ResourceFactory from '../resources/resourceFactory';
import SourceResourceDecorator from '../resources/sourceResourceDecorator';
import articlesTemplate from './articles.pug';

export default class Articles {
	constructor() {
		this.id = `articles-container-${+ new Date()}`;
	}

	getArticlesTemplate() {
		return articlesTemplate(this);
	}

	// imo it's facade
	getArticles(category) {
		let sourceResource = ResourceFactory.getResource('source');
		let sourceResourceDecorator = new SourceResourceDecorator(sourceResource);
		sourceResourceDecorator.load(category);
		let articleResource = ResourceFactory.getResource('article');

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
