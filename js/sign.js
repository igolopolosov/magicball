var sign = angular.module('sign', ['ngAnimate']);

sign.controller('signController', function ($scope, $modalInstance, postService, $sessionStorage) {
    "use strict";
    $scope.authData = {
        userName: '',
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
        postService.Login($scope.authData).then(function (response) {
            if (response.status == 'success') {
                $sessionStorage.token = response.token;
                $sessionStorage.userName = response.user;
                $modalInstance.close(response.user);
            } else {
                $scope.alert.isError = true;
                $scope.alert.text = response.message;
            }
        }, function (err) {
        });
    }
});