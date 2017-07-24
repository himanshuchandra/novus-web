'use strict';

/**
 * @ngdoc service
 * @name novusApp.webindex
 * @description
 * # webindex
 * Factory in the novusApp.
 */
angular.module('novusApp')
  .factory('webindex', function ($http,$q,phpurl) {
      
      var object = {

        needReload:true,
        loaded:false,
        loggedIn:false,
        userData:{
            Scases:0,
            Hcases:0,
            Dcases:0,
        },

        checkStatus:function(){
          var defer = $q.defer(); 
          $http.post(phpurl+'/php/signup/check.php')
          .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        },

        sendActivationLink:function(){
          var defer = $q.defer(); 
          $http.post(phpurl+'/sendActivationLink')
          .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        },
        
        logout:function(){
          var defer = $q.defer(); 
          $http.post(phpurl+'/php/signup/logout.php')
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
