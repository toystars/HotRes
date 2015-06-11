var app = angular.module('hot-res', ['ui.router', 'ngCookies'])

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('loggedOut', {
        url: '/',
        views: {
          '' : {
            templateUrl: '../partials/nav-loggedOut.html'
          },
          'theView@loggedOut': {
            templateUrl: '../partials/landing.html',
            controller: 'MainCtrl'
          }
        }
      })

      .state('loggedOut.search', {
        url: 'search',
        views: {
          'theView': {
            templateUrl: '../partials/search-results.html',
            controller: 'hotelSearchCtrl'
          }
        }
      })

      .state('loggedOut.signUpLogIn', {
        url: 'signUpLogIn',
        views: {
          'theView': {
            templateUrl: '../partials/signUpLogIn.html',
            controller: 'SignUpLogInCtrl'
          }
        }
      })

      .state('loggedIn', {
        url: '/dashboard',
        views: {
          '' : {
            templateUrl: '../partials/nav-loggedIn.html',
            controller: 'DashboardMainCtrl'
          },
          'theView@loggedIn': {
            templateUrl: '../partials/dashboard.html',
            controller: 'DashboardMainCtrl'
          }
        }
      });

  }]);