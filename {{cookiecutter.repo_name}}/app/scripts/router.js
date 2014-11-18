'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');
    //
    // Now set up the states
    $stateProvider
      .state('home', {
        isAuthenticationRequired: false,
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'views/pages/home.html',
      })
      .state('login', {
        isAuthenticationRequired: false,
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'views/pages/login.html',
      })
      .state('dashboard', {
        isAuthenticationRequired: true,
        url: '/dashboard',
        controller: 'DashboardCtrl',
        templateUrl: 'views/pages/dashboard.html',
      })
  }]);

// STATE CHANGE AUTHENTICATION CHECKS

app.run(['$rootScope', '$state', 'CurrentUser', function($rootScope, $state,  CurrentUser) {

  var checkStateAccess = function(CurrentUser, toState, fromState, event){

    var isStateChangeAllowed = false;
    var error = '[ AUTH ] : State change not allowed for user to '+toState.name

    if(!toState.isAuthenticationRequired){
      isStateChangeAllowed = true;
    }
    else{
      isStateChangeAllowed = (CurrentUser.isAuthenticated) ? true : false;
    }

    if(!isStateChangeAllowed){
      event.preventDefault();
      console.log(error);
    }

    return isStateChangeAllowed;
  };

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    console.log('[ AUTH ] : State change success.... to '+toState.name);
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    console.log('[ AUTH ] : State change initiated.... to '+toState.name+' from '+fromState.name );
    if(toState.name == 'login'){
      return
    }

    if(fromState.name !== ''){
      checkStateAccess(CurrentUser, toState, fromState, event);
    }
    else{
      if(typeof CurrentUser.token === 'undefined'){
        event.preventDefault();
        console.log('[ AUTH ] : State change allowed temporarily. Trying to load User.');
        CurrentUser.loginUserUsingCache().then(function(){
          if(checkStateAccess(CurrentUser, toState, fromState, event))
          {
            console.log('[ AUTH ] : State allowed for user .... reloading.');
            $state.go(toState.name, toParams, {reload: true});
          }
        }, function(){
          console.log('[ AUTH ] : Unable to load user.... redirecting to login.');
          $state.go('login', {}, {reload: true});
        });
      }
      else{
        checkStateAccess(CurrentUser, toState, fromState, event);
      }
    }
  });
}]);
