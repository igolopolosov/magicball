var navigation = angular.module('navigation', ['ui.bootstrap']);

navigation.controller('navigationController', function ($scope, $modal, $sessionStorage) {
    "use strict";
    $scope.authorizedUser = false;
    $scope.userName = '';

    $scope.openSignModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/sign.html',
            controller: 'signController'
        });
        modalInstance.result.then(function (user) {
            $scope.userName = user;
            $scope.authorizedUser = true;
        });
    };

    $scope.signOut = function () {
        $scope.authorizedUser = false;
    };
});