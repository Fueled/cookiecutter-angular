'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}.services');

app.service('CurrentUser', ['$rootScope', '$q', 'Restangular', '$cookies', 'settings',
    function CurrentUserService($rootScope, $q, Restangular, $cookies, settings) {
        return {
            user: {
                profile: {},
                isAuthenticated: false
            },
            fetchedUser: false,  // for maintaining if the 1st call to fetch user has been made.
            fetch: function() {
                var self = this;
                var deferred = $q.defer();
                var promise = deferred.promise;

                var token = $cookies.get('Token');
                if (token) {
                    Restangular.defaultHeaders.Authorization = 'Bearer ' + token;
                }

                var currentUserResource = Restangular.one(settings.CURRENT_USER_PATH);

                currentUserResource.get().then(function(response) {
                    self.user.profile = response.data;
                    self.fetchedUser = true;
                    self.user.isAuthenticated = true;
                    deferred.resolve(response.data);
                }, function(error) {
                    console.log(error);
                    self.fetchedUser = true;
                    deferred.reject(error);
                });

                return promise;
            },
            update: function(payload) {
                var self = this;
                var deferred = $q.defer();
                var promise = deferred.promise;

                var currentUserResource = Restangular.one(settings.CURRENT_USER_PATH);

                currentUserResource.patch(payload).then(function(response) {
                    self.user.profile = response.data;
                    deferred.resolve();
                }, function(error) {
                    console.log(error);
                    deferred.reject(error);
                });

                return promise;
            },
        };
    }
]);
