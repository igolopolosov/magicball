var sign = angular.module('sign', ['ngAnimate']);

sign.controller('signController', function ($scope, $modalInstance, authService) {
    "use strict";
    $scope.authData = {
        user: '',
        password: ''
    };
    $scope.alert = {
        isError: false,
        text: ''
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
    };
    $scope.pressOk = function () {
        $scope.alert.isError = false;
        authService.login($scope.authData).then(function (response) {
            if (response.status == 'success') {
                $modalInstance.close(response);
            } else {
                $scope.alert.isError = true;
                $scope.alert.text = response.message;
            }
        }, function (err) {
        });
    };

    $scope.getLoginInfoByToken = function () {
        authService.getLoginInfoByToken().then(function (response) {
            if (response.status == 'success') {
                $scope.authData.user = response.user;
                $scope.authData.password = response.password;
            }
        }, function (err) {
        });
    }
});