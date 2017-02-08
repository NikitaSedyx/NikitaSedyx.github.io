describe('component controller: paginator', () => {

  let $componentController = null;

  beforeEach(angular.mock.module('components'));

  beforeEach(inject(
    (_$componentController_) => {
      $componentController = _$componentController_;
    }
  ));

  it('should call the `onPageChange` binding, when clicking page number', () => {
    let onPageChangeSpy = jasmine.createSpy('onPageChange');
    let bindings = {page: 1, totalCount: 17, perPage: 5, onPageChange: onPageChangeSpy};
    let ctrl = $componentController('paginator', null, bindings);
    ctrl.onPageChange({page: 2});
    expect(onPageChangeSpy).toHaveBeenCalledWith({page: 2});
  });

  it('should calculate page range', () => {
    let bindings = {page: 1, totalCount: 17, perPage: 5};
    let ctrl = $componentController('paginator', null, bindings);
    let changes = new StubChanges().addInitialChange('totalCount', 17).addInitialChange('perPage', 5).build()
    ctrl.$onChanges(changes);
    initialPages = ctrl.pages;

    changes = new StubChanges().addChange('totalCount', 25).addChange('perPage', 5).build();
    ctrl.$onChanges(changes);
    changedPages = ctrl.pages;
    expect(initialPages[0]).toBe(changedPages[0]);
    expect(initialPages.length).not.toBe(changedPages.length);
    expect(initialPages[initialPages.length - 1]).not.toBe(changedPages[changedPages.length - 1]);
  });

});
