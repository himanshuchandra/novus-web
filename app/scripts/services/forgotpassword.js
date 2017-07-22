'use strict';

/**
 * @ngdoc service
 * @name novusApp.forgotpassword
 * @description
 * # forgotpassword
 * Factory in the novusApp.
 */
angular.module('novusApp')
  .factory('forgotpassword', function ($http,$q,phpurl) {
      
      var object= {

        sendLink:function(ForgotObject){
          var defer = $q.defer(); 
          $http.post(phpurl+'/php/signup/fpass.php',ForgotObject)
          .then(function(data){
            defer.resolve(data); 
          },function(error){
            defer.reject(error);
          })
          return defer.promise;
        },

        verifyCode:function(CodeObject){
          var defer = $q.defer(); 
          $http.post(phpurl+'/php/signup/checkf.php',CodeObject)
          .then(function(data){
            defer.resolve(data); 
          },function(error){
            defer.reject(error);
          })
          return defer.promise;
        },

        passwordReset:function(PasswordObject){
          var defer = $q.defer(); 
          $http.post(phpurl+'/php/signup/resetpass.php',PasswordObject)
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
