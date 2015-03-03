var main = angular.module('main', []);

main.controller('mainController', function ($scope, postService) {
    "use strict";
    $scope.questionData = {
        userName: 'Guest',
        questionText: ''
    };

    $scope.answerText = '';

    $scope.SendQuestion = function () {
        postService.SendQuestion($scope.questionData).then(function (response) {
            $scope.answerText = response;
        }, function (err) {
            $scope.Error = true;
            $scope.ErrorMessage = err;
        });
    };
});
