'use strict';

/* Controllers */

angular.module('myApp.controllers')
    .controller('LoginCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', 'Alert',
        function ($scope, $rootScope, AUTH_EVENTS, AuthService, Alert) {
            $scope.credentials = {};

            $scope.login = function (credentials) {
                AuthService.login(credentials).success(function (me) {
                    $scope.setMe(me);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                }).error(function (data) {
                    Alert.alert(data, true);
                });
            };
        }]);



