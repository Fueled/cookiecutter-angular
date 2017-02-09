'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/404');
    //
    // Now set up the states
    $stateProvider
    .state('home', {
        isAuthenticationRequired: false,
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'views/pages/home.html',
        data: {
            bodyClasses: 'home'
        }
    })
    .state('login', {
        isAuthenticationRequired: false,
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'views/pages/login.html',
        data: {
            bodyClasses: 'login'
        }
    })
    .state('dashboard', {
        isAuthenticationRequired: true,
        url: '/dashboard',
        controller: 'DashboardCtrl',
        templateUrl: 'views/pages/dashboard.html',
        data: {
            bodyClasses: 'dashboard'
        }
    });
}]);

app.run(['$rootScope', '$state', 'CurrentUser', '$timeout', function($rootScope, $state,  CurrentUser, $timeout) {
    var isAuthenticationRequired = function(toState) {
        return toState.isAuthenticationRequired;
    };

    var isSubsciptionRequired = function(toState) {
        return toState.isSubscriptionRequired;
    };

    var isSubscriptionActive = function() {
        return CurrentUser.user.profile.is_subscription_active;
    };

    var isUserAuthenticated = function() {
        return CurrentUser.user.isAuthenticated;
    };

    var redirectUser = function(event, toState, fromState) {
        if (toState.url == '/404' && fromState.name == ''){
            event.preventDefault();
            $timeout(function() {
                $state.go('home', { reload: true });
            }, 0);
            return;
        }
    }

    $rootScope.$on('$stateChangeSuccess', function(event, toState){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){

    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.log("$stateChangeError", error);
        if (error && error.status == 404){
            event.preventDefault();
            $timeout(function(){
                $state.go('404', {reload: true, notify: true});
            }, 0)
        }
    });
}]);
