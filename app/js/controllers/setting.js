'use strict';

/* Controllers */

angular.module('myApp.controllers')
    .controller('SettingCtrl', ['$scope', '$window', '$http', '$state', 'Alert',
        function ($scope, $window, $http, $state, Alert) {
            $window.scrollTo(0, 0);
            $scope.passwd = {};
            $scope.changePasswd = function () {
                $scope.changing = true;
                $http.post("/admin/me/passwd", $scope.passwd)
                    .success(function () {
                        $scope.passwd = {};
                        $scope.changing = false;
                        Alert.alert("修改成功");
                        $state.go("home.index");
                    }).error(function (data) {
                        $scope.passwd = {};
                        $scope.changing = false;
                        Alert.alert(data, true);
                    });
            };
        }]);