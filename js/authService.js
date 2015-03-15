angular.module('auth', []).factory('authService', function ($location, $http, $q, $sessionStorage) {

    var user = {
        isAuthenticated: false,
        name: ''
    };

    if ($sessionStorage.user === undefined) $sessionStorage.user = user;
    else user = $sessionStorage.user;

    var authService = {};

    authService.isAuthenticated = function () {
        return user.isAuthenticated;
    };

    authService.getLoginInfoByToken = function () {
        var deferred = $q.defer();
        if (user.token == null) return deferred.promise;
        $http.post('api/authentication', {
            token: user.token
        }).success(function (response) {
            if (response.status == 'success') {
                user.name = response.user;
            }
            deferred.resolve(response);
        }).error(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    authService.login = function (authData) {
        var deferred = $q.defer(authData);
        $http.post('api/login', {
            user: authData.user,
            password: authData.password
        }).success(function (response) {
            user.isAuthenticated = response.status == 'success';
            if (response.status == 'success') {
                user.name = response.user;
                user.token = response.token;
            }
            deferred.resolve(response);
        }).error(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    authService.logout = function () {
        user.isAuthenticated = false;
        user.name = '';
    };

    authService.register = function (registerModel) {
        return Restangular.all('accounts').customPOST(registerModel, 'register');
    };

    return authService;
});