'use strict';

import LoadButton from './js/loadButton/loadButton.js';

;(function(){
	const ROUTE = document.querySelector('#route');

	const drawContent = function(content) {
		ROUTE.innerHTML = '';
		ROUTE.innerHTML = content;
	};

	let loadNewsButton = new LoadButton('Load News');
	ROUTE.innerHTML = loadNewsButton.getLoadButtonTemplate();
	loadNewsButton.addHandler('click', () => {
		require.ensure([], (require) => {

			const {CATEGORIES} = require('./js/constants/constants');
			const CategoryMenu = require('./js/categoryMenu/categoryMenu.js');
			const Articles = require('./js/articles/articles.js');

			let categoryMenu = new CategoryMenu(CATEGORIES);
			let articles = new Articles();
			drawContent(categoryMenu.getCategoryMenuTemplate());

			let loadArticles = category => {
				articles.getArticles(category)
					.then(() => {
						let content = `${categoryMenu.getCategoryMenuTemplate(category)}${articles.getArticlesTemplate()}`;
						drawContent(content);
						categoryMenu.addHandler('click', (e) => {
							loadArticles(e.target.attributes['data-code'].value);
						});
					});	
			};
			loadArticles();
		}, 'news');
	});

})()
