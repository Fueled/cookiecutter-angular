'use strict';

var app = angular
  .module('{{cookiecutter.base_app_name}}', [
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    '{{cookiecutter.base_app_name}}.models',
    '{{cookiecutter.base_app_name}}.directives',
    'ui.router',
    'mm.foundation',
  ]);

var models = angular.module('{{cookiecutter.base_app_name}}.models', []);
var directives = angular.module('{{cookiecutter.base_app_name}}.directives', []);
