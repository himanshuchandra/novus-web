'use strict';

/**
 * @ngdoc service
 * @name novusApp.emailactivate
 * @description
 * # emailactivate
 * Factory in the novusApp.
 */
angular.module('novusApp')
  .factory('emailactivate', function ($http,$q,phpurl) {

    var object = {

        activateEmail:function(activationObject){
            var defer = $q.defer(); 
            $http.post(phpurl+'/commonroutes/activateEmail',activationObject)
            .then(function(data){
                defer.resolve(data);
            },function(error){
                defer.reject(error);
            }) 
            return defer.promise;
        },

    };
    return object;

  });
