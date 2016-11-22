;(function () {

	const articleContainer = document.querySelector('.articles');
	const categoriesContainer = document.querySelector('.categories');
	const sourceResource = new SourceResource();
	const articleResource = new ArticleResource();

	let createArticle = (fragment, articleObj) => {
		let { author, description, title, urlToImage: image, publishedAt } = articleObj;
		let template = `
			<div>
				<h4>${ title }</h4>
			</div>
			<div>
				<img src="${ image }" alt="${ title }">
				<p>${ description }</p>
			</div>
			<div>
				<time>${ new Date(publishedAt).toDateString() }</time>
			</div>
			<div class="clearfix"></div>
		`;
		let articleElement = document.createElement('article');
		articleElement.innerHTML = template;
		fragment.appendChild(articleElement);
	};

	let clearArticleContainer = () => articleContainer.innerHTML = '';

	let loadContent = category => {
		sourceResource.load(category).then(sources => {
			let articlePromises = sources.map(({ id }) => {
				return articleResource.load(id);
			});
			Promise.all(articlePromises).then(data => {
				clearArticleContainer();
				let fragment = document.createDocumentFragment();
				data.forEach(articleSet => createArticle(fragment, ...articleSet));
				articleContainer.appendChild(fragment);
			});
		});
	};

	loadContent();

	categories.forEach(({ name, code }) => {
		let categoryElement = document.createElement('li');
		categoryElement.innerHTML = name;
		categoryElement.addEventListener('click', () => loadContent(code));
		categoriesContainer.appendChild(categoryElement);
	});
})();