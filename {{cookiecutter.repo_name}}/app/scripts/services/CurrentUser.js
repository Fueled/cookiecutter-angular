'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}.services');

app
  .service('CurrentUser', ['$rootScope', '$q', 'Restangular', '$cookies', 'settings', function CurrentUserService($rootScope, $q, Restangular, $cookies, settings) {

    return {
      profile: {},
      isAuthenticated: false,
      fetch: function(){
        var self = this;
        var deferred = $q.defer();
        var promise = deferred.promise;

        var userResource = Restangular.one('users', self.id);

        userResource.get().then(function(response){
          self.id = response.data.id;
          self.profile = response.data;
          deferred.resolve();
        },function(error){
          console.log(error);
          deferred.reject(error);
        });

        return promise;
      },
      update: function(){
        var self = this;
        var deferred = $q.defer();
        var promise = deferred.promise;

        var payload = {
        };

        var userResource = Restangular.one('users', self.id);

        userResource.patch(payload).then(function(response){
          self.profile = response.data;
          deferred.resolve();
        },function(error){
          console.log(error);
          deferred.reject(error);
        });

        return promise;
      },
      login: function(username, password){
        var self = this;
        var deferred = $q.defer();
        var promise = deferred.promise;

        var payload = {
          phone_number: username,
          password: password
        };

        var authResource = Restangular.all(settings.AUTH_PATH);

        var token;

        authResource.post(payload).then(function(response){
          self.id = response.data.id;
          token = response.data.auth_token;
          console.log('Authentication token received...');
          Restangular.setDefaultHeaders({'Authorization': 'Bearer '+token});
          $cookies.token = token;
          self.isAuthenticated = true;
          self.token = token;
          self.profile = response.data;
          $cookies.current_user = self.id;
          deferred.resolve();
        },function(error){
          console.log(error);
          deferred.reject(error);
        });

        return promise;
      },
      loginUserUsingCache: function(){
        var self = this;
        var deferred = $q.defer();
        var promise = deferred.promise;

        var savedToken = $cookies.token;
        var currentUserId = $cookies.current_user;
        if(savedToken && currentUserId){
          Restangular.setDefaultHeaders({'Authorization': 'Bearer '+savedToken});
          self.token = savedToken;
          self.id = currentUserId;
          self.fetch().then(function(){
            self.isAuthenticated = true;
            deferred.resolve();
          }, function(error){
            console.log(error);
            deferred.reject();
          });
        }
        else{
          console.log('[ AUTH ] : No CACHED User available.');
          deferred.reject('No token saved');
        };

        return promise;
      },
      logout: function(){
        var self = this;
        self.isAuthenticated = false;
        delete self.token;
        self.profile = {};
        delete $cookies.token;
        delete $cookies.current_user;
        Restangular.setDefaultHeaders({'Authorization': ''});
      }
    }

  }]);
