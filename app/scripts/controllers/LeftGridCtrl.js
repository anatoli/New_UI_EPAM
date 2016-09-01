angular.module('EpamNewUIApp')

    .controller('LeftGridCtrl', ['$scope','$http', 'NgTableParams', function ($scope, $http, NgTableParams ) {
    $scope.noTableData = true;
    $scope.noTableDataQ = true;
      $http.get('testData.json').success(function(response) {
        $scope.data = response.data;
        if(response.data.length > 0){
            $scope.noTableData = false;
        }else{
          $scope.noTableData = true;
        }
      });

      $scope.questions = function (data) {
        $http(
          {
            method: 'GET',
            url: data.id+'.json'})
          .success(function(response) {
              $scope.questionsList = response.data;
              if(response.data.length > 0){
                $scope.noTableDataQ = false;
              }else{
                $scope.noTableDataQ = true;
              }
            var self = this;
            self.tableParams = new NgTableParams({}, { dataset:  $scope.questionsList});
          })
          .error(function(data, status, headers, config) {
             $scope.noTableDataQ = true;
        });
      }

      $scope.remove = function ($scope) {
        $scope.remove();
      };

      $scope.toggle = function ($scope) {
        $scope.toggle();
      };

      $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
      };

      $scope.newSubItem = function ($scope) {
        var nodeData = $scope.$modelValue;
        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
          nodes: []
        });
      };
      $scope.selectNode = function (node) {
        $scope.treeSelected = true;
        $scope.treeSelection = node;
        $scope.gridSelection = null;
        $scope.questions(node);
      };

      $scope.removeAlert=function(data){
        alert(data);
      };
      $scope.newSubItemAlert=function(data){
        alert(data);
      };

      $scope.collapseAll = function () {
        $scope.$broadcast('angular-ui-tree:collapse-all');
      };

      $scope.expandAll = function () {
        $scope.$broadcast('angular-ui-tree:expand-all');
      };


      $scope.remove = function(scope) {
        scope.remove();
      };

      $scope.newSubItem = function(scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
          nodes: []
        });
      };

      $scope.visible = function(item) {
        if ($scope.query && $scope.query.length > 0
          && item.title.indexOf($scope.query) == -1) {
          return false;
        }
        return true;
      };

      $scope.findNodes = function(){

      };


    $scope.httpGetAsync = function(){
        alert('start');
        $http({
            method: 'GET',
            url: '52.25.197.45:8080/portfolio/api/base/item',
            headers: {
                'Content-Type': undefined
            },
        }).
        success(function(data, status) {
            alert('success');
            $scope.status = status;
            $scope.dataSuccess = data;
        }).
        error(function(data, status) {
            alert('failed');
            $scope.dataError = data || "Request failed";
            $scope.status = status;
        });
        alert('finish');

    };

      var _defaultFilter = {
        //from: getFromDate(),
        //to: null,
        status: 'n',
        sort: 'created,id',
        dir: 'desc,desc',
        start: 0,
        count: 10
      };

      $scope.showreg = false;
      $scope.noTableData = false;
      $scope.filter = angular.extend(angular.copy(_defaultFilter));
      //$scope.filter = angular.copy(_defaultFilter);

      $scope.gridSelection = null;
      $scope.gridSelected = false;

      // $scope.configTableParams = createUsingFullOptions($scope.filter);
      // function createUsingFullOptions(filter) {
      //   var initialParams = {
      //     page: (filter.start + filter.count)/filter.count || 1,
      //     count: filter.count || 1000
      //   };
      //   var initialSettings = {
      //     counts: [10, 25, 50, 75],
      //     getData: function($defer, params) {
      //       var selectPage = params.page();
      //       var selectItemOnPage = params.count();
      //       var orders = params.orderBy();
      //       var sort = "", dir = "";
      //       orders.forEach(function(item, i){
      //         sort += item.substring(1) + ',';
      //         dir += item.substring(0,1) == '+' ? 'desc' : 'asc' + ',';
      //       });
      //       if(orders.length > 0){
      //         $scope.filter.sort = sort.substring(0, sort.length - 1);
      //         $scope.filter.dir = dir.substring(0, dir.length - 1);
      //       }
      //
      //       $scope.filter.start = (selectPage - 1) * selectItemOnPage;
      //       $scope.filter.count = selectItemOnPage;
      //
      //       // $state.go($state.current, { filter: $scope.filter}, {notify: false});
      //       $http(
      //         {
      //           method: 'GET',
      //           url: 1+'.json'})
      //         .success(function(response) {
      //           $scope.questionsList = response.data;
      //           alert($scope.questionsList[0].title);
      //           if(response.data.length > 0){
      //             $scope.noTableDataQ = false;
      //           }else{
      //             $scope.noTableDataQ = true;
      //           }
      //         })
      //         .error(function(data, status, headers, config) {
      //           $scope.noTableDataQ = true;
      //         });
      //       // Cases.get($scope.filter, function (response) {
      //       //   params.total(response.total_count);
      //       //   $scope.noTableData = (response.total_count === 0) ? true : false;
      //       //   //console.log("TABLE: " + JSON.stringify(response.data, null, 2));
      //       //   $defer.resolve(response.data);
      //       // }, function (error) {
      //       //   //
      //       // });
      //     }
      //   };
      //   // return new NgTableParams(initialParams, initialSettings);
      // }

      function reloadGrid(clearSelected){
        if(clearSelected){
          $scope.gridSelection = null;
          $scope.gridSelected = false;
        }
        $scope.configTableParams.reload();
      }

      $scope.selectTableItem = function(item) {
        // console.log("Selected CASE");
        // console.log(item);
        $scope.gridSelection = item;
        $scope.gridSelected = true;
      };
}]);
