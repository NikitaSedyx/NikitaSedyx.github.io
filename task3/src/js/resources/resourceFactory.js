'use strict';

import ArticleResource from '../resources/articleResource';
import BaseResource from './baseResource';
import SourceResource from '../resources/sourceResource';

// simle factory
export default class ResourceFactory {
  static getResource(resourceName) {
    switch (resourceName) {
      case 'source':
        return new SourceResource();
      case 'article':
        return new ArticleResource();
      default:
        return new BaseResource(resourceName);
    }
  }
}
