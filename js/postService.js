var postService = angular.module('postService', ['ngRoute']);

postService.factory('postService', function ($q, $http, $location) {
    'use strict';
    var postServiceFactory = {},
        answerText,
        errorMessage,
        SendQuestion = function (questionData) {
            var deferred = $q.defer(questionData);
            $http.post('/SendQuestion', { user: questionData.userName, question: questionData.questionText }).success(function (response) {
                answerText = response.AnswerText;
                deferred.resolve(answerText);
            }).error(function (err) {
                errorMessage = "Sorry, couldn't connect to server";
                deferred.reject(errorMessage);
            });
            return deferred.promise;
        };
    postServiceFactory.SendQuestion = SendQuestion;
    postServiceFactory.answerText = answerText;
    postServiceFactory.errorMessage = errorMessage;
    return postServiceFactory;
});


