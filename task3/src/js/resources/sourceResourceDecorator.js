'use strict';

export default class SourceResourceDecorator {
  constructor(sourceResource) {
    this.sourceResource = sourceResource;
  }

  load(category='') {
    this.sourceResource.load(category)
      .then(sources => {
        sources.forEach(source => source.name = `Decorated ${source.name}`);
        return sources;
      })
  }
}
