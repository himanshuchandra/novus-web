'use strict';

/**
 * @ngdoc service
 * @name novusApp.signup
 * @description
 * # signup
 * Factory in the novusApp.
 */
angular.module('novusApp')
  .factory('signup', function ($http,$q,phpurl) {

    var object = {
        
        sendCode:function(mobileObject){
          var defer = $q.defer();
           $http.post(phpurl+'/signup/registerUser',mobileObject)
           .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        },

        registerUser:function(userObject){
          var defer = $q.defer();
           $http.post(phpurl+'/php/signup/signup.php',userObject)
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
