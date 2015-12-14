'use strict';

angular.module('myApp.controllers')
    .controller('MenPaiHaoCtrl',
    function ($scope, $modal, $log, Alert, ConfirmService, CONFIG, data, Org, orgs) {
            $scope.data = data;
            $scope.orgs = orgs;
            $scope.grid = {
                page: 1
            };

            var refresh = function (page) {
                var SPEC = {page: page, size: CONFIG.limit};
                if ($scope.grid.oid) {
                    SPEC.id = $scope.grid.oid;
                }

                if ($scope.grid.buy){
                    SPEC.buy = $scope.grid.buy;
                }

                var d = Org.menpaihao.get(SPEC, function () {
                    $scope.data = d;
                });
            };

            $scope.search = function () {
                refresh($scope.grid.page);
            };

            $scope.$watch('grid.page', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    refresh(newVal);
                }
            });

            $scope.$watch('grid.oid', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    if ($scope.grid.page = 1){
                        refresh($scope.grid.page);
                    }else {
                        $scope.grid.page = 1
                    }
                }
            });


        $scope.edit = function (idx) {
            var u = $scope.data.data[idx];
            $modal.open({
                templateUrl: 'views/edit_org_dlg.html',
                controller: function ($scope, $modalInstance) {
                    $scope.org = u;
                    $scope.sub = {
                        name: '',
                        memo: '',
                        tp: u.tp + 1
                    };

                    $scope.save = function (name, val) {
                        var SPEC = {};
                        SPEC[name] = val;
                        return Org.update({id: u.id}, SPEC, function (res) {
                            if (res.code == 1) {
                                Alert.alert('操作成功！');
                                if (name == "buy"){
                                    if (val == "true"){
                                        val = true;
                                    }else{
                                        val = false;
                                    }
                                }
                                u[name] = val;
                            } else {
                                Alert.alert('操作失败！' + res.data, true);
                            }
                        }, function (res) {
                            Alert.alert('操作失败！' + res, true);
                        });
                    };

                    $scope.remove = function () {
                        ConfirmService.confirm('确定要删除此门牌号吗?').then(function () {
                            Org.remove({id: u.id}, function () {
                                $scope.refresh = true;
                                $scope.ok();
                                Alert.alert('操作成功！');
                            }, function (res) {
                                Alert.alert('操作失败！' + res, true);
                            });
                        });
                    };

                    $scope.ok = function () {
                        $modalInstance.close({refresh: $scope.refresh});
                    };
                }
            }).result.then(function (data) {
                    if (data.refresh) {
                        refresh();
                    }
                });
        };
        }
    )
;







