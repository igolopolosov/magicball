var postService = angular.module('postService', []);

postService.service('postService', function ($q, $http) {
    'use strict';
    this.SendQuestion = function (questionData) {
        var deferred = $q.defer(questionData);
        $http.post('api/add-question', {
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

    this.GetQuestions = function (userName) {
        var deferred = $q.defer(userName);
        $http.post('api/get-questions', {
            user: userName
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
});


