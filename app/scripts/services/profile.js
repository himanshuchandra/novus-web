'use strict';

/**
 * @ngdoc service
 * @name novusApp.profile
 * @description
 * # profile
 * Factory in the novusApp.
 */
angular.module('novusApp')
  .factory('profile', function ($http,$q,phpurl) {

    var object = {
        /* Optional call if loading data from session
        getData:function(){
          var defer = $q.defer(); 
          $http.post(phpurl+'/profile/getData')
          .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        },*/

        checkUsername:function(usernameObj){
           var defer = $q.defer();
           $http.post(phpurl+'/commonroutes/checkUsername',usernameObj)
           .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        },
        
       changeUsername:function(usernameObject){
            var defer=$q.defer();
            $http.post(phpurl+"/profile/changeUsername",usernameObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                defer.reject(error);
            })
            return defer.promise;
        },

        updateProfileData:function(profileObject){
            var defer=$q.defer();
            $http.post(phpurl+"/profile/updateProfileData",profileObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                defer.reject(error);
            })
            return defer.promise;
        },

        updateMobile:function(mobileObject){
            var defer=$q.defer();
            $http.post(phpurl+"/profile/updateMobile",mobileObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                defer.reject(error);
            })
            return defer.promise;
        },

        verifyCode:function(codeObject){
            var defer=$q.defer();
            $http.post(phpurl+"/profile/verifyCode",codeObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                defer.reject(error);
            })
            return defer.promise;
        },

        setNewPassword:function(passwordObject){
            var defer=$q.defer();
            $http.post(phpurl+"/profile/setNewPassword",passwordObject)
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
