var navigation = angular.module('navigation', ['ui.bootstrap', 'ngAnimate']);

navigation.controller('navigationController', function ($scope, $modal, $location, authService) {
    "use strict";
    $scope.authorizedUser = authService.isAuthenticated();

    $scope.openSignModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/sign.html',
            controller: 'signController'
        });

        modalInstance.result.then(function (response) {
            if (response.status == 'success') {
                $scope.authorizedUser = authService.isAuthenticated();
            }
        });
    };

    $scope.signOut = function () {
        authService.logout();
        $scope.authorizedUser = authService.isAuthenticated();
        $location.path('/');
    };

    $scope.toMainPage = function () {
        $location.path('/');
    };

    $scope.toProfilePage = function () {
        $location.path('/profile');
    };
});