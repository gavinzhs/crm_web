'use strict';

/* Controllers */

angular.module('myApp.controllers')
    .controller('HomeCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', 'me',
        function ($scope, $rootScope, AUTH_EVENTS, AuthService, me) {
            if (!$scope.me) {
                $scope.setMe(me);
            }

            $scope.logout = function () {
                var cb = function () {
                    $scope.setMe(null);
                    $rootScope.$broadcast(AUTH_EVENTS.loginNeeded);
                };
                AuthService.logout().success(cb).error(cb);
            };
        }]);




