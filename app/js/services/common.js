'use strict';

/* Common Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services')
    .value('version', 'v1.0')
    .factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS',
        function ($rootScope, $q, AUTH_EVENTS) {
            var CODE_MAPPING = {
                401: AUTH_EVENTS.loginNeeded,
                403: AUTH_EVENTS.httpForbidden,
                419: AUTH_EVENTS.loginNeeded,
                440: AUTH_EVENTS.loginNeeded
            };
            return {
                request: function (config) {
                    $rootScope.loading = true;
                    return config
                },
                requestError: function (rejection) {
                    $rootScope.loading = false;
                    return $q.reject(rejection);
                },
                response: function (res) {
                    $rootScope.loading = false;
                    return res;
                },
                responseError: function (response) {
                    $rootScope.loading = false;
                    var val = CODE_MAPPING[response.status];
                    if (val) {
                        $rootScope.$broadcast(val, response);
                    }
                    return $q.reject(response);
                }
            };
        }])
    .service('ConfirmService', ['$modal', function ($modal) {
        this.confirm = function (txt) {
            return $modal.open({
                templateUrl: 'views/w/confirm.html',
                size: 'sm',
                controller: function ($scope, $modalInstance, txt) {
                    $scope.txt = txt;
                    $scope.ok = function () {
                        $modalInstance.close(true);
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                },
                resolve: {
                    txt: function () {
                        return txt;
                    }
                }
            }).result;
        };
    }])
    .service('Alert', ['$modal', function ($modal) {
        this.alert = function (txt, err) {
            return $modal.open({
                templateUrl: 'views/w/alert.html',
                size: 'sm',
                controller: function ($scope, $modalInstance, txt) {
                    $scope.txt = txt;
                    $scope.err = err;
                    $scope.ok = function () {
                        $modalInstance.close();
                    };
                },
                resolve: {
                    txt: function () {
                        return txt;
                    },
                    err: function () {
                        return err;
                    }
                }
            }).result;
        };
    }])
    .service('AuthService', ['$http', function ($http) {
        this.login = function (credentials) {
            return $http.post('/admin/pub/login', credentials);
        };
        this.logout = function () {
            return $http.post('/admin/pub/logout', {});
        };
    }])
    .service('Up', ['$upload', 'Alert', function ($upload, Alert) {
        var opts = {
            queueLimit: 1,
            url: '/pub/up',
            alias: 'bin',
            removeAfterUpload: true
        };

        this.build = function (cb) {
            //var uploader = new FileUploader(opts);
            //
            //uploader.onSuccessItem = function (fileItem, data) {
            //    cb(data);
            //};
            //uploader.onErrorItem = function (fileItem, res, status) {
            //    Alert.alert('upload fail: ' + status + ',  ' + res, true);
            //};
            //
            //return uploader;
        }
    }])
    .service('UpDlg', ['$modal', 'Up', '$upload', 'Alert', function ($modal, Up, $upload, Alert) {
        this.open = function (url) {
            return $modal.open({
                templateUrl: 'views/w/up_dlg.html',
                controller: function ($scope, $modalInstance) {
                    //$scope.uploader = Up.build(function (data) {
                    //    $scope.uploading = false;
                    //    $modalInstance.close(data);
                    //});
                    //
                    $scope.ok = function () {
                        console.log($scope.file);
                        $upload.upload({
                            url: url,
                            file: $scope.file[0]
                        }).progress(function (evt) {
                            $scope.uploading = true;
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                        }).success(function (data, status, headers, config) {
                            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                            $scope.uploading = false;
                            $modalInstance.close(data);
                        }).error(function (data, status, headers, config) {
                            console.log(data, status);
                            $scope.uploading = false;
                            Alert.alert('upload fail: ' + data, true);
                        });

                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            }).result;
        };
    }])
    .service('TrimService', function () {
        this.trim = function (str) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    });



