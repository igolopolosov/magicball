var routes = angular.module('routes', []);

routes.config(function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {
        templateUrl: './views/main.html',
            controller: 'mainController'
        })
        .otherwise({ redirectTo: '/' });
});