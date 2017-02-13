'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}');

app.controller('HomeCtrl', ['$scope', function ($scope) {
    $scope.message = 'Hello, Home !';
}]);
