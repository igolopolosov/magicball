var routes = angular.module('routes', ['ngRoute', 'ngStorage']);

routes.config(function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {
        templateUrl: './views/main.html',
        controller: 'mainController'
    }).when('/profile', {
        templateUrl: './views/profile.html',
        controller: 'profileController',
        resolve: {
            auth: function ($q, authService, $location) {
                var deferred = $q.defer();
                if (!authService.isAuthenticated()) {
                    $location.path('/');
                    deferred.reject();
                } else {
                    deferred.resolve();
                }
                return deferred.promise;
            }
        }
    }).when('/join', {
        templateUrl: './views/join.html',
        controller: 'joinController'
    }).otherwise({redirectTo: '/'});
});