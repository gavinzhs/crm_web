'use strict';

/* Controllers */

angular.module('myApp.controllers')
    .controller('MainCtrl', ['$rootScope', '$scope', '$state', 'Alert', 'AUTH_EVENTS',
        function ($rootScope, $scope, $state, Alert, AUTH_EVENTS) {
            $scope.setMe = function (me) {
                $rootScope.me = me;
            };
            $scope.$on(AUTH_EVENTS.loginNeeded, function () {
                $state.go("login");
            });
            $scope.$on(AUTH_EVENTS.loginSuccess, function () {
                $state.go("home.index");
            });
            $scope.$on(AUTH_EVENTS.httpForbidden, function () {
                Alert.alert('forbidden', true);
            });
        }]);


