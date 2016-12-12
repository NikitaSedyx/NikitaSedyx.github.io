'use strict';

import BaseResource from './baseResource';

export default class ArticleResource extends BaseResource {
	constructor() {
		super('articles');		
	}

	load(source) {
		return super.load({source}).then(({articles}) => articles);
	}
}
