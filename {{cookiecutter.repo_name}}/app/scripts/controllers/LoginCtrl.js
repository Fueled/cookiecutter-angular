'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}');

app.controller('LoginCtrl', ['$scope', 'CurrentUser', '$state', function ($scope, CurrentUser, $state) {

  $scope.temps = {};

  $scope.temps.loading = false;

  $scope.login = function(){
    $scope.temps.loading = true;
    CurrentUser.login($scope.temps.username, $scope.temps.password).then(function(){
      $scope.temps.loading = false;
      $state.go('dashboard', {});
    }, function(){
      $scope.temps.loading = false;
    });
  };

  var init = function(){
    CurrentUser.logout();
  };

  init();
}]);
