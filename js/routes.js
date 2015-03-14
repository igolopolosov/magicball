var routes = angular.module('routes', ['ngRoute']);

routes.config(function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {
        templateUrl: './views/main.html',
        controller: 'mainController'
    }).when('/profile', {
        templateUrl: './views/profile.html',
        controller: 'profileController'
    }).when('/join', {
        templateUrl: './views/join.html',
        controller: 'joinController'
    }).otherwise({redirectTo: '/'});

});