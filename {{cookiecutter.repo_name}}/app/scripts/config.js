'use strict';

var app = angular.module('{{cookiecutter.base_app_name}}');

app.config(['$httpProvider', 'RestangularProvider', 'settings', '$locationProvider',
    function($httpProvider, RestangularProvider, settings, $locationProvider){


    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // Make sure ! doesn't show up in the url.
    $locationProvider.hashPrefix('');

    RestangularProvider.setBaseUrl(settings.API_BASE_URL);

    // with credentials to make sure cookies related to aps
    RestangularProvider.setDefaultHttpFields({cache: false});
    RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});
    RestangularProvider.setFullResponse(true);
    RestangularProvider.setDefaultRequestParams({format: 'json'});

    // REST FRAMEWORK SPECIFIC PAGINATION
    RestangularProvider.setResponseExtractor(function(response, operation) {
        if (operation === 'getList') {
            var objects = response.results;
            objects._paginationInfo = {
                count: response.count,
                next: response.next,
                previous: response.previous
            };
            return objects;
        }

        return response;
    });

}]);
