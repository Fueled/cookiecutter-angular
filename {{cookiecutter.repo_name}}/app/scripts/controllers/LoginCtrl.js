'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}');

app.controller('LoginCtrl', ['$scope', 'AuthService', '$state', function($scope, AuthService, $state) {
    $scope.temps = {};
    $scope.temps.loading = false;
    $scope.login = function(){
        $scope.temps.loading = true;
        AuthService.login({ username: $scope.temps.username, password: $scope.temps.password }).then(function() {
        $scope.temps.loading = false;
        $state.go('dashboard', {});
    }, function(){
        $scope.temps.loading = false;
    });
  };
}]);
