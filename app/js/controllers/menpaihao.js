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
        }
    )
;


