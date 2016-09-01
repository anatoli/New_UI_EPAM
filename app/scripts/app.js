'use strict';


  angular.module('EpamNewUIApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.tree',
  'ngTable',
])
  .config(function ($stateProvider, $urlRouterProvider) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('index', {
        url: '/',
        views: {
          'leftGrid': {
            url:'',
            templateUrl: 'views/leftGrid.html',
            controller: 'LeftGridCtrl'
          },
          // 'footer':{
          //   templateUrl: '/views/layouts/footer.html',
          //   controller: 'FooterCtrl'
          // },
          'rightGrid':{
            url:'',
            templateUrl: 'views/rightGrid.html',
            controller: 'RightGridCtrl'

            }
          }
      })
  })




