'use strict';

/* Controllers */

angular.module('myApp.controllers')
    .controller('ListOpCtrl', function ($scope, $window, $state, Alert, ConfirmService, data, Op, ResetOpPasswordDlg) {
        $window.scrollTo(0, 0);
        $scope.tabset = {
            list: true
        };
        $scope.data = data;

        $scope.$watch('data.page', function (newVal, oldVal) {
            if (newVal == oldVal) {
                return;
            }
            refresh(newVal);//当不在第一页,会查询两次
        });


        $scope.remove = function (idx) {
            ConfirmService.confirm('确认删除?').then(function () {
                var o = $scope.data.data[idx];
                Op.remove({id: o.id}, function () {
                    Alert.alert('删除完成');
                    $scope.data.data.splice(idx, 1);
                }, function (res) {
                    Alert.alert(res.data, true);
                });
            });
        };

        $scope.resetPassword = function (o) {
            ResetOpPasswordDlg.open(o);
        };

        var refresh = function (page) {

            var SPEC = {};
            if (page) {
                SPEC.page = page;
            }
            var d = Op.list(SPEC, function () {
                $scope.data = d;
            });
        };

        $scope.show = function (idx) {
            $scope.index = idx;
            $scope.tabset = {show: true};
            $scope.op = $scope.data.data[idx];
        };
        $scope.edit = function (idx) {
            $scope.index = idx;
            $scope.tabset = {update: true};
            $scope.op = angular.copy($scope.data.data[idx]);
        };

        $scope.update = function () {
            var _op = angular.copy($scope.op);
            Op.save({id: _op.id}, _op, function () {
                Alert.alert("操作成功");
                $scope.data.data[$scope.index] = $scope.op;
            }, function (res) {
                Alert.alert("操作失败：" + res, true);
            })
        };

    })
    .controller('CreateOpCtrl', function ($scope, $window, $state, Alert, Op) {
        $window.scrollTo(0, 0);
        $scope.data = {};

        $scope.sub = function () {
            var op = angular.copy($scope.data);
            delete op.confirmPasswd;
            Op.save(op, function () {
                Alert.alert('创建成功');
                $state.go('home.listOp');
            }, function (res) {
                Alert.alert(res.data, true);
            });
        };
    })
    .controller('ShowOpCtrl', function ($scope, $filter, $q, $http, Alert, OpService, op, Op) {
        $scope.data = op;

        $scope.checkLoginName = function (uid) {
            var d = $q.defer();

            OpService.checkLoginName(uid).success(function (res) {
                if (res == '') {
                    d.resolve();
                } else {
                    d.resolve(res);
                }
            }).error(function (res) {
                d.resolve(res == '' ? 'Server error!' : res);
            });

            return d.promise;

        };

        $scope.update = function (id, key, val) {
            Op.update({id: id, key: key, val: val}, function () {
                Alert.alert("操作成功");
            }, function (res) {
                Alert.alert("操作失败：" + res, true);
            })
        };

    });




