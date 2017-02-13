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
    })
    .state('404', {
        url: '/404',
        isAuthenticationRequired: false,
        controller: function() {
            // blank controller
        },
        templateUrl: 'views/pages/404.html',
        data: {
            bodyClasses: 'four generic'
        }
    });
}]);

app.run(['$rootScope', '$state', 'CurrentUser', function($rootScope, $state, CurrentUser) {
    var isAuthenticationRequired = function(toState) {
        return toState.isAuthenticationRequired;
    };

    var isUserAuthenticated = function() {
        return CurrentUser.user.isAuthenticated;
    };

    var redirectUser = function(event, toState, fromState) {
        if (toState.url == '/404' && fromState.name == ''){
            event.preventDefault();
            $state.go('home', { reload: true });
            return;
        }

        if (isAuthenticationRequired(toState)) {
            if (isUserAuthenticated()) {
                if (toState.name === 'login') {
                    event.preventDefault();
                    $state.go('dashboard', { reload: true });
                    return;
                }
            } else {
                event.preventDefault();
                $state.go('login', { reload: true });
                return;
            }
        }
    };

    $rootScope.$on('$stateChangeSuccess', function(event, toState){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
        if (!CurrentUser.fetchedUser) {
            // This block just make sure current user call has been made the user is loaded if he/she is already
            // authenticated
            CurrentUser.fetch().then(function(){
                redirectUser(event, toState, fromState);
            }, function() {
                redirectUser(event, toState, fromState);
            });
        } else {
            redirectUser(event, toState, fromState);
        }
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.log("$stateChangeError", error);
        if (error && error.status == 404){
            event.preventDefault();
            $state.go('404', { reload: true, notify: true });
        }
    });
}]);
