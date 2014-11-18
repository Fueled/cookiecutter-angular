'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}.models');

app
  .factory('Base', ['$rootScope', '$q', 'Restangular', '$cookies', function BaseFactory($rootScope, $q, Restangular, $cookies) {

    return {
      combineInto: function(obj){
        // Since this is a Base Class we should extend as (obj, this)
        angular.extend(obj, this);
        return obj;
      },
      fetch: function(){
        var self = this;
        var deferred = $q.defer();
        var promise = deferred.promise;
        self.syncing = true;

        var resource = Restangular.one(self.API_ROUTE, self.id);

        // Helps prevent caching
        var payload = {
          time: new Date().toISOString()
        }

        resource.get(payload).then(function(response){
          self.id = response.data.id;
          angular.extend(self, response.data);
          self.syncing = false;
          deferred.resolve();
        },function(error){
          console.log(error);
          self.syncing = false;
          deferred.reject(error);
        });

        return promise;
      },
      update: function(payload){
        var self = this;
        var deferred = $q.defer();
        var promise = deferred.promise;
        self.syncing = true;

        var resource = Restangular.one(self.API_ROUTE, self.id);

        resource.patch(payload).then(function(response){
          self.profile = response.data;
          return self.fetch();
        }).then(function(){
          self.syncing = false;
          deferred.resolve();
        },function(error){
          console.log(error);
          self.syncing = false;
          deferred.reject(error);
        });

        return promise;
      },
      delete: function(){
        var self = this;
        var deferred = $q.defer();
        var promise = deferred.promise;
        self.syncing = true;

        var resource = Restangular.one(self.API_ROUTE, self.id);

        // Helps prevent caching
        var payload = {
          time: new Date().toISOString()
        }

        resource.delete(payload).then(function(response){
          self.syncing = false;
          deferred.resolve();
        },function(error){
          self.syncing = false;
          deferred.reject(error);
        });

        return promise;
      }
    }

  }]);
