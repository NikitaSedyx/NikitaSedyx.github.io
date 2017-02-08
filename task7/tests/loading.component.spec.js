describe('component: loading', () => {

  let scope = null;
  let element = null;

  beforeEach(angular.mock.module('components'));

  beforeEach(inject(
    (_$rootScope_, _$compile_) => {
      scope = _$rootScope_.$new();
      element = angular.element('<loading></loading>');
      element = _$compile_(element)(scope);
    }
  ));

  it('should have text Loading...', () => {
    expect(element.find('div').text()).toBe('Loading...');
  })
})
