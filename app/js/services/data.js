'use strict';

/* Data Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services')
    .factory('Op', function ($resource) {
        var Op = $resource('/admin/op/:id', {id: '@id'}, {
            list: {method: 'GET'},
            update: {method: 'POST'}
        });

        Op.me = $resource('/admin/me');
        return Op;
    })
    .service('OpService', function ($http) {
        this.checkLoginName = function (uid) {
            return $http.post('/admin/op/check/login/uid/', {uid: uid});
        };
    })
    .service('ResetOpPasswordDlg', function ($modal, $http) {
        this.open = function (data) {
            return $modal.open({
                templateUrl: 'views/op/reset_password.html',
                controller: function ($scope, $modalInstance, Alert) {
                    if (data) {
                        $scope.data = {id: data.id, uid: data.uid}
                    } else {
                        $scope.data = {};
                    }

                    $scope.ok = function () {
                        $http.post("/admin/op/" + $scope.data.id + "/reset_password", {password: $scope.data.newPasswd})
                            .success(function () {
                                $scope.data = {};
                                Alert.alert("修改成功");
                                $modalInstance.close();
                            }).error(function (data) {
                                Alert.alert(data, true);
                            });

                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            }).result;
        };
    });





