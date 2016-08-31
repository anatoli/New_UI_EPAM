angular.module('EpamNewUIApp')

    .controller('LeftGridCtrl', ['$scope','$http', function ($scope, $http) {
    $scope.noTableData = true;
      $http.get('testData.json').success(function(response) {
        $scope.data = response.data;
        if(response.data.length > 0){
            $scope.noTableData = false;
        }else{
          $scope.noTableData = true;
        }
      });

      $scope.remove = function (scope) {
        scope.remove();
      };

      $scope.toggle = function (scope) {
        scope.toggle();
      };

      $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
      };

      $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
          nodes: []
        });
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

    }
}]);
