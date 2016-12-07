'use strict';

import {NEWS_API, API_KEY} from '../constants/constants';

export default class BaseResource {
	constructor(resourceName) {
		this.resourceName = resourceName;
	}

	getResourceUri() {
		return `${NEWS_API}${this.resourceName}`;
	}

	buldRequestUrl(params={}) {
		let url = new URL(this.getResourceUri());
		url.searchParams.append('apiKey', API_KEY);
		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
		return url;
	}

	load(params) {
		// command
		let requestUrl = this.execute('buldRequestUrl', params)
		let successCb = response => {
			if (response.ok) {
				return response.json();
			} else {
				Promise.reject();
			}
		}
		return fetch(requestUrl).then(successCb);
	}

	execute(command, ...params) {
		return this[command] && this[command](...params)
	}
}
