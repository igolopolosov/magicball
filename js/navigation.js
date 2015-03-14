var navigation = angular.module('navigation', ['ui.bootstrap', 'ngAnimate']);

navigation.controller('navigationController', function ($scope, $modal, $location) {
    "use strict";
    $scope.authorizedUser = false;

    $scope.openSignModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/sign.html',
            controller: 'signController'
        });
        modalInstance.result.then(function () {
            $scope.authorizedUser = true;
            $location.path('/profile');
        });
    };

    $scope.signOut = function () {
        $scope.authorizedUser = false;
    };

    $scope.toMainPage = function () {
        $location.path('/');
    };

    $scope.toProfilePage = function () {
        $location.path('/profile');
    };
});