angular.module('EpamNewUIApp')

    .controller('LeftGridCtrl', ['$scope','$http', 'NgTableParams', '$uibModal', function ($scope, $http, NgTableParams, $uibModal ) {
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
    $scope.add = function () {
      $scope.newAddShow = true
    };

    $scope.revertAdd = function () {
      $scope.newAddShow = false;
      $scope.newTitle = null;
    };
    $scope.saveAdd = function () {
      console.log($scope);
      var sch = {};
      sch.nodes=[];
      sch.title = $scope.example;
      sch.id = $scope.data[$scope.data.length-1].id+1;
      sch.level = 10;

      $scope.data.push(sch);
      console.log( $scope.data);
      $scope.newAddShow = false;
    };

    $scope.questionsAdd = function (data) {
      $uibModal.open({
        backdropClass: 'backdrop',
        backdrop: 'static',
        animation: false,
        size: 'lg',
        templateUrl: 'views/questionsAdd.html',
        resolve: {
          dataModal: function () {
            return {
              'data': $scope.treeSelection,
              'typeCase': null
            }
          }
        },
        controller: function ($scope, $uibModalInstance, dataModal) {
          console.log(dataModal.data);
          $scope.header = dataModal.data.title;
          $scope.answers = [1,2,3,4];
          $scope.addAnswer = function () {
            var arr = $scope.answers;
            arr.push( arr[arr.length-1]+1);
          };
          $scope.radioModel = 'Middle';

          $scope.checkModel = {
            false: true,
            true: false,
          };
          $scope.ok = function () {
          };
          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
        }
      });
    }

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

      // $scope.gridSelection = null;
      // $scope.gridSelected = false;

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
