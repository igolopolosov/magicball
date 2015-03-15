var profile = angular.module('profile', []);

profile.controller('profileController', function ($sessionStorage, postService, $scope) {
    "use strict";
    $scope.questionTypes = ['Положительный', 'Нерешительно положительный', 'Нейтральный', 'Отрицательный'];
    $scope.questions = [];
    $scope.userName = $sessionStorage.user.name;

    $scope.amountOfQuestions = function () {
        return $scope.questions.length;
    };

    $scope.getPercentage = function (type) {
        var filtred = $scope.questions.filter(function (elem) {
            return elem.AnswerType == type
        });
        return 100 * (filtred.length / $scope.questions.length);
    };

    $scope.createStringFor = function (typeNumber) {
        return $scope.questionTypes[typeNumber] + ': ' + $scope.getPercentage($scope.questionTypes[typeNumber]) + '% ответов.';
    };

    $scope.getQuestions = function () {
        postService.GetQuestions($sessionStorage.user.name).then(function (response) {
            $scope.questions = response.questions;
        }, function (err) {
        });
    }

});
