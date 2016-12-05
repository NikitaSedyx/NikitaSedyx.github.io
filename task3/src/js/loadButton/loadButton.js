'use strict';

import loadButtonTemplate from './loadButton.pug';

export default class LoadButton {
	constructor(label) {
		this.id = `load-button-${+ new Date()}`;
		this.label = label;
	}

	getLoadButtonTemplate() {
		return loadButtonTemplate(this);
	}

	addHandler(eventType, handler) {
		setTimeout(() => {
			let button = document.querySelector(`#${this.id}`);
			if (button) {
				button.addEventListener(eventType, handler);
			}
		})
	}
};
