var postService = angular.module('postService', []);

postService.service('postService', function ($q, $http) {
    'use strict';
    this.SendQuestion = function (questionData) {
        var deferred = $q.defer(questionData);
        $http.post('api/question', {
            user: questionData.userName,
            question: questionData.text,
            date: questionData.date
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.Login = function (authData) {
        var deferred = $q.defer(authData);
        $http.post('api/login', {
            user: authData.userName,
            password: authData.password
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
});


