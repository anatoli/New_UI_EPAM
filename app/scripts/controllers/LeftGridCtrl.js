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
