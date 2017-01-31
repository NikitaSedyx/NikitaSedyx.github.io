angular.module('components', [])

  .service('topicResource', function() {
    let topicList = [
      {
        title: '1 title',
        description: 'asds asd sad dasd as dsa ds ad as das das'
      },
      {
        title: '2 title',
        description: 'asds asd sad dasd as dsa ds ad as das das'
      },
      {
        title: '3 title',
        description: 'asds asd sad dasd as dsa ds ad as das das'
      },
      {
        title: '4 title',
        description: 'asds asd sad dasd as dsa ds ad as das das'
      },
      {
        title: '5 title',
        description: 'asds asd sad dasd as dsa ds ad as das das'
      },
      {
        title: '6 title',
        description: 'asds asd sad dasd as dsa ds ad as das das'
      },
      {
        title: '7 title',
        description: 'asds asd sad dasd as dsa ds ad as das das'
      }
    ];

    this.getTopics = getTopics;
    this.getTopicCount = getTopicCount;

    function getTopics(offset, limit) {
      return topicList.slice(offset, limit);
    }

    function getTopicCount() {
      return topicList.length;
    }
  })

  .component('loading', {
    template: '<div>Loading...</div>'
  })

  .component('topic', {
    templateUrl: 'templates/topic.html',
    controllerAs: 'topicCtrl',
    bindings: {
      topic: '<'
    }
  })

  .component('topicList', {
    templateUrl: 'templates/topicList.html',
    controller: topicListController,
    controllerAs: 'topicListCtrl'
  })

  .component('paginator', {
    templateUrl: 'templates/paginator.html',
    controller: paginatorController,
    controllerAs: 'paginatorCtrl',
    bindings: {
      page: '<',
      totalCount: '<',
      perPage: '<',
      onPageChange: '&'
    }
  })

function topicListController(topicResource) {
  const vm = this;
  const LIMIT = 5;

  vm.topicCount = topicResource.getTopicCount();
  vm.topicPerPage = LIMIT;
  vm.onPageChange = onPageChange;
  vm.topicCount = 5;
  vm.topicCount = 6;
  onPageChange(1);

  function onPageChange(page) {
    vm.currentPage = page;
    let offset = (page - 1) * LIMIT;
    vm.topicList = topicResource.getTopics(offset, offset + LIMIT);
  }
}

function paginatorController() {
  const vm = this;

  vm.$onChanges = function(changedObj) {
    if ('totalCount' in changedObj) {
      let pageCount = Math.ceil(changedObj.totalCount.currentValue / changedObj.perPage.currentValue);
      vm.pages = [...Array(pageCount).keys()].map((v) => v + 1);
    }
  }
}
