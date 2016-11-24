'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

;(function () {

	var articleContainer = document.querySelector('.articles');
	var categoriesContainer = document.querySelector('.categories');
	var sourceResource = new SourceResource();
	var articleResource = new ArticleResource();

	var createArticle = function createArticle(fragment, articleObj) {
		var author = articleObj.author,
		    description = articleObj.description,
		    title = articleObj.title,
		    image = articleObj.urlToImage,
		    publishedAt = articleObj.publishedAt;

		var template = '\n\t\t\t<div>\n\t\t\t\t<h4>' + title + '</h4>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<img src="' + image + '" alt="' + title + '">\n\t\t\t\t<p>' + description + '</p>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<time>' + new Date(publishedAt).toDateString() + '</time>\n\t\t\t</div>\n\t\t\t<div class="clearfix"></div>\n\t\t';
		var articleElement = document.createElement('article');
		articleElement.innerHTML = template;
		fragment.appendChild(articleElement);
	};

	var clearArticleContainer = function clearArticleContainer() {
		return articleContainer.innerHTML = '';
	};

	var loadContent = function loadContent(category) {
		sourceResource.load(category).then(function (sources) {
			var articlePromises = sources.map(function (_ref) {
				var id = _ref.id;

				return articleResource.load(id);
			});
			Promise.all(articlePromises).then(function (data) {
				clearArticleContainer();
				var fragment = document.createDocumentFragment();
				data.forEach(function (articleSet) {
					return createArticle.apply(undefined, [fragment].concat(_toConsumableArray(articleSet)));
				});
				articleContainer.appendChild(fragment);
			});
		});
	};

	loadContent();

	categories.forEach(function (_ref2) {
		var name = _ref2.name,
		    code = _ref2.code;

		var categoryElement = document.createElement('li');
		categoryElement.innerHTML = name;
		categoryElement.addEventListener('click', function () {
			return loadContent(code);
		});
		categoriesContainer.appendChild(categoryElement);
	});
})();