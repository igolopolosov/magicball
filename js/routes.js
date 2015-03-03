var routes = angular.module('routes', []);

routes.config(function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {
            templateUrl: './application/views/main.html',
            controller: 'mainController'
        })
        .otherwise({ redirectTo: '/' });
});