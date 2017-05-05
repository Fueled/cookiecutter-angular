'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}.services');

app.service('AuthService', ['$q', 'Restangular', '$cookies', 'CurrentUser', 'settings',
    function AuthService($q, Restangular, $cookies, CurrentUser, settings) {
        return {
            login: function(loginData) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                Restangular.one(settings.LOGIN_OR_REGISTER_PATH).post('', loginData).then(function(response) {
                    CurrentUser.user.profile = response.data;
                    CurrentUser.user.isAuthenticated = true;

                    var token = response.data.token;
                    $cookies.put('Token', token);
                    Restangular.defaultHeaders.Authorization = 'Bearer ' + token;

                    deferred.resolve();
                }, function(error){
                    console.log(error);
                    deferred.reject(error);
                });

                return promise;
            },

            logout: function(){
                var deferred = $q.defer();
                var promise = deferred.promise;

                Restangular.one(settings.LOGOUT_PATH).post('', {}).then(function() {
                    CurrentUser.user.profile = {};
                    CurrentUser.user.isAuthenticated = false;
                    $cookies.remove('Token');
                    delete Restangular.defaultHeaders.Authorization;
                    deferred.resolve();
                }, function(error) {
                    console.log(error);
                    deferred.reject(error);
                });

                return promise;
            }
        };
    }
]);
