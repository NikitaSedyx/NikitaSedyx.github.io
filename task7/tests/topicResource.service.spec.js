describe('service: topicResource', () => {
  let topicResource = null;

  beforeEach(angular.mock.module('components'));

  beforeEach(inject(
    (_topicResource_) => {
      topicResource = _topicResource_;
    }
  ))

  it('.getTopics() should return stub array', () => {
    let topics = topicResource.getTopics();
    expect(topics).toBeDefined();
    expect(Array.isArray(topics)).toBeTruthy();
  })

  it('.getTopicCount() should return count of topics in topicList', () => {
    let topics = topicResource.getTopics();
    let topicsCount = topicResource.getTopicCount();
    expect(topics.length).toEqual(topicsCount);
  })
})
