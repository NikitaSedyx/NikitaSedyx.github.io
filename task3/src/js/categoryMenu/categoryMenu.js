'use strict';

import categoryMenuTemplate from './categoryMenu.pug';

export default class CategoryMenu {
	constructor(categories, className='') {
		this.className = className;
		this.id = `category-menu-${+ new Date()}`;
		this.categories = categories;
	}

	getCategoryMenuTemplate(activeCategory='') {
		this.activeCategory = activeCategory;
		return categoryMenuTemplate(this);
	}

	addHandler(eventType, handler) {
		setTimeout(() => {
			this.categories.forEach((category) => {
				let categoryOption = document.querySelector(`#${this.id} li[data-code="${category.code}"]`);
				if (categoryOption) {
					categoryOption.addEventListener(eventType, handler);
				}
			})
		})
		
	}
};
