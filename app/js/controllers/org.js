'use strict';

angular.module('myApp.controllers')
    .controller('OrgCtrl', ['$scope', '$log', '$modal', 'Alert', '$http', '$filter', 'ConfirmService', 'root', 'Org',
        function ($scope, $log, $modal, Alert, $http, $filter, ConfirmService, root, Org) {
            $scope.list = [root];
            $scope.uids = [];
            var refresh = function () {
                var o = Org.get({id: 0}, function () {
                    $scope.list = [o];
                });
            };

            $scope.edit = function (scope) {
                $modal.open({
                    templateUrl: 'views/edit_org_dlg.html',
                    controller: function ($scope, $modalInstance, org, parent) {
                        $scope.org = org;
                        $scope.sub = {
                            name: '',
                            memo: '',
                            tp: org.tp + 1
                        };

                        $scope.save = function (name, val) {
                            var SPEC = {};
                            SPEC[name] = val;
                            return Org.update({id: org.id}, SPEC);
                        };

                        $scope.addSubOrg = function () {
                            $scope.sub.parent = org.id;
                            console.log("添加的:", $scope.sub);
                            Org.update({}, $scope.sub, function (data) {
                                $scope.sub = {
                                    name: '',
                                    memo: '',
                                    tp: org.tp + 1
                                };
                                if (data.code == 1) {
                                    $scope.refresh = true;
                                    Alert.alert('操作成功！');
                                } else {
                                    Alert.alert('操作失败！' + data.data, true);
                                }
                            }, function (res) {
                                $scope.sub = {};
                                Alert.alert('操作失败！' + res, true);
                            });
                        };

                        $scope.remove = function () {
                            ConfirmService.confirm('确定要删除此门牌号吗?').then(function () {
                                Org.remove({id: org.id}, function () {
                                    $scope.refresh = true;
                                    $scope.ok();
                                    Alert.alert('操作成功！');
                                }, function (res) {
                                    Alert.alert('操作失败！' + res, true);
                                });
                            });
                        };

                        $scope.ok = function () {
                            $modalInstance.close({org: org, refresh: $scope.refresh});
                        };
                    },
                    resolve: {
                        org: function () {
                            if (scope.$modelValue.memo) {
                                //it's an org
                                return scope.$modelValue;
                            } else {
                                //it's a node
                                return Org.get({id: scope.$modelValue.id}).$promise;
                            }
                        },
                        parent: function () {
                            if (scope.$parentNodeScope) {
                                return scope.$parentNodeScope.$modelValue;
                            } else {
                                return null;
                            }
                        }
                    }
                }).result.then(function (data) {
                        scope.$modelValue.name = data.org.name;
                        scope.$modelValue.title = data.org.memo;
                        if (data.refresh) {
                            refresh();
                        }
                    });
            };

            $scope.tryToggle = function (scope) {
                if (!scope.collapsed || scope.$modelValue.isLeaf || scope.$modelValue.loaded) {
                    scope.toggle();
                    if (scope.$modelValue.isLeaf && !scope.$modelValue.loaded) {
                        scope.$modelValue.children = [];
                        scope.$modelValue.loaded = true;
                    }
                    return;
                }
                var o = Org.get({id: scope.$modelValue.id}, function () {
                    scope.$modelValue.children = o.children;
                    scope.$modelValue.loaded = true;
                    scope.toggle();
                });
            };
        }]);


