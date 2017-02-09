'use strict';

angular.module('{{cookiecutter.base_app_name}}', [
    'ngCookies',
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    'truncate',
    'ui.router',
    'restangular',
    '{{cookiecutter.base_app_name}}.settings',
    '{{cookiecutter.base_app_name}}.models',
    '{{cookiecutter.base_app_name}}.services',
    '{{cookiecutter.base_app_name}}.directives',
  ]);

angular.module('{{cookiecutter.base_app_name}}.models', []);
angular.module('{{cookiecutter.base_app_name}}.services', []);
angular.module('{{cookiecutter.base_app_name}}.directives', []);
