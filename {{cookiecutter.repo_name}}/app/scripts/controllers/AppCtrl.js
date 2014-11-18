'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}');

app.controller('AppCtrl', ['$scope', 'CurrentUser', function ($scope, CurrentUser) {

  console.log('Application controller loaded..');

  $scope.CurrentUser = CurrentUser;

}]);
