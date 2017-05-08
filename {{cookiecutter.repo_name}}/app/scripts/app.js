'use strict';

angular.module('{{cookiecutter.base_app_name}}', [
    // Angular
    'ngCookies',
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    'truncate',
    'ui.router',
    'restangular',

    // Vendor
    // 'credit-cards',
    // 'angularMoment',

    // {{cookiecutter.project_name}}
    '{{cookiecutter.base_app_name}}.settings',
    '{{cookiecutter.base_app_name}}.models',
    '{{cookiecutter.base_app_name}}.services',
    '{{cookiecutter.base_app_name}}.directives',
    '{{cookiecutter.base_app_name}}.filters',
  ]);

angular.module('{{cookiecutter.base_app_name}}.models', []);
angular.module('{{cookiecutter.base_app_name}}.services', []);
angular.module('{{cookiecutter.base_app_name}}.directives', []);
angular.module('{{cookiecutter.base_app_name}}.filters', []);