var postService = angular.module('postService', ['ngRoute']);

postService.factory('postService', function ($q, $http) {
    'use strict';
    var postService = {},
        answerText = '',
        errorMessage = '',
        SendQuestion = function (questionData) {
            var deferred = $q.defer(questionData);
            $http.post('api/question', {
                user: questionData.userName,
                question: questionData.text,
                date: questionData.date
            }).success(function (response) {
                answerText = response;
                deferred.resolve(answerText);
            }).error(function (err) {
                errorMessage = err;
                deferred.reject(errorMessage);
            });
            return deferred.promise;
        };
    postService.answerText = answerText;
    postService.errorMessage = errorMessage;
    postService.SendQuestion = SendQuestion;
    return postService;
});


