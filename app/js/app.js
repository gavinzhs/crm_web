'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'ui.utils',
    'ng.ueditor',
    'ngSanitize',
    'xeditable',
    'angularFileUpload',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
])
    .constant('CONFIG', {
        limit: 10
    })
    .constant('AUTH_EVENTS', {
        loginNeeded: 'auth-login-needed',
        loginSuccess: 'auth-login-success',
        httpForbidden: 'auth-http-forbidden'
    })
    .config(['$stateProvider', '$urlRouterProvider', 'CONFIG', function ($stateProvider, $urlRouterProvider, CONFIG) {
        $urlRouterProvider.otherwise("/login");

        var resolveMe = function ($rootScope, Op) {
            if ($rootScope.me) {
                return $rootScope.me;
            } else {
                return Op.me.get().$promise;
            }
        };

        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'LoginCtrl',
                templateUrl: 'views/login.html'
            })
            .state('home', {
                abstract: true,
                resolve: {
                    me: resolveMe
                },
                controller: 'HomeCtrl',
                templateUrl: 'views/home.html'
            })
            .state('home.index', {
                url: '/index',
                templateUrl: 'views/home_index.html'
            })
            .state('home.setting', {
                url: '/setting',
                controller: 'SettingCtrl',
                templateUrl: 'views/setting.html'
            })
            .state('home.listOp', {
                url: '/op/list',
                resolve: {
                    data: function (Op) {
                        return Op.list().$promise;
                    }
                },
                controller: 'ListOpCtrl',
                templateUrl: 'views/op/list.html'
            })
            .state('home.createOp', {
                url: '/op/create',
                controller: 'CreateOpCtrl',
                templateUrl: 'views/op/create.html'
            })
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    }])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeStart', function () {
            $rootScope.transfering = true;
        });
        $rootScope.$on('$stateChangeSuccess', function (event, current) {
            $rootScope.transfering = false;
        });
    }]).run(['editableOptions', function (editableOptions) {
        editableOptions.theme = 'bs3';
    }]);

angular.module('myApp.controllers', ['ui.bootstrap']);
angular.module('myApp.services', []);


