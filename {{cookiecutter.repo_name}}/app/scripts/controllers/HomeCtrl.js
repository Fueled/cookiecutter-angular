'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}');

app.controller('HomeCtrl', ['$scope', function ($scope) {
    $scope.message = 'Hello, Home !';

    $scope.exampleForm = {
        model: {},
        form: {},
        errors: [],
        fields: [
            {
                label: 'First name',
                id: 'first_name',
                placeholder: 'Joe',
                required: true,
                autoComplete: 'given-name'
            }, {
                label: 'Last name',
                id: 'last_name',
                placeholder: 'Bloggs',
                required: true,
                autoComplete: 'family-name'
            }, {
                label: 'Email address',
                id: 'email',
                placeholder: 'joe.bloggs@example.com',
                required: true,
                type: 'email',
                autoComplete: 'home email'
            }, {
                label: 'Password',
                id: 'password',
                placeholder: 'Enter a strong password',
                type: 'password',
                required: true,
                minlength: 6
            }
        ]
    };
}]);
