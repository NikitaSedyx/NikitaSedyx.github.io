'use strict';

import BaseResource from './baseResource';

export default class SourceResource extends BaseResource {
	constructor() {
		super('sources');
	}

	load(category='') {
		return super.load({category})
			.then(({sources}) => sources);
	}
}
