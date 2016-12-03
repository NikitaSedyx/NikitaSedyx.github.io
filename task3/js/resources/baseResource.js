class BaseResource {
	constructor(resourceName) {
		this.resourceName = resourceName;
	}

	getResourceUri() {
		return `${newsApi}${this.resourceName}`;
	}

	buldRequestUrl(params={}) {
		let url = new URL(this.getResourceUri());
		url.searchParams.append('apiKey', apiKey);
		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
		return url;
	}

	load(params) {
		let requestUrl = this.buldRequestUrl(params);
		let successCb = response => {
			if (response.ok) {
				return response.json();
			} else {
				Promise.reject();
			}
		}
		return fetch(requestUrl).then(successCb);
	}
}
