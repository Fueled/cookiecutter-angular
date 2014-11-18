'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}');

app.constant('settings', {
  API_BASE_URL: '{{cookiecutter.api_base_url}}',
  AUTH_PATH: '{{cookiecutter.api_auth_url}}',
});
