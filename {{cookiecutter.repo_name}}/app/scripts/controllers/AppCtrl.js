'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}');

app.controller('AppCtrl', ['$scope', 'CurrentUser', function ($scope, CurrentUser) {

    // Route based ClassName
    var vm = this;
    vm.bodyClasses = 'default';

}]);
