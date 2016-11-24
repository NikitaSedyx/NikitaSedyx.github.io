'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseResource = function () {
	function BaseResource(resourceName) {
		_classCallCheck(this, BaseResource);

		this.resourceName = resourceName;
	}

	_createClass(BaseResource, [{
		key: 'getResourceUri',
		value: function getResourceUri() {
			return '' + newsApi + this.resourceName;
		}
	}, {
		key: 'buldRequestUrl',
		value: function buldRequestUrl() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var url = new URL(this.getResourceUri());
			url.searchParams.append('apiKey', apiKey);
			Object.keys(params).forEach(function (key) {
				return url.searchParams.append(key, params[key]);
			});
			return url;
		}
	}, {
		key: 'load',
		value: function load(params) {
			var requestUrl = this.buldRequestUrl(params);
			var successCb = function successCb(response) {
				if (response.ok) {
					return response.json();
				} else {
					Promise.reject();
				}
			};
			return fetch(requestUrl).then(successCb);
		}
	}]);

	return BaseResource;
}();