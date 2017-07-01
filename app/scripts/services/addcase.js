'use strict';

/**
 * @ngdoc service
 * @name novusApp.addcase
 * @description
 * # addcase
 * Factory in the novusApp.
 */
angular.module('novusApp')
  .factory('addcase', function ($http,$q) {

    var object={
      loadHCoptions:function(obj){
        var defer = $q.defer(); 
        $http.get('server/hcoptions.json')
        .then(function(data){
          defer.resolve(data); 
        },function(error){
          defer.reject(error);
        })
        return defer.promise;
      },

      loadDCoptions1:function(obj){
        var defer = $q.defer(); 
        $http.get('server/hcoptions.json')
        .then(function(data){
          defer.resolve(data); 
        },function(error){
          defer.reject(error);
        })
        return defer.promise;
      },

      loadDCoptions2:function(obj){
        var defer = $q.defer(); 
        $http.get('server/hcoptions.json')
        .then(function(data){
          defer.resolve(data); 
        },function(error){
          defer.reject(error);
        })
        return defer.promise;
      },

      sendSupremeData:function(obj){
        var defer = $q.defer(); 
        // $http.post("http://ec2-13-126-94-166.ap-south-1.compute.amazonaws.com/php/signin.php",obj)
        $http.post("http://mynovus.xyz/php/add_sup.php",obj)
        .then(function(data){
          defer.resolve(data); 
        },function(error){
          defer.reject(error);
        })
        return defer.promise;
      },

      sendDistrictData:function(obj){
        var defer = $q.defer(); 
          var url="Macintosh HD\Users\mukuljuneja\Desktop\novus softwares\novus-web/app/views";
        $http.get(url)
        .then(function(data){
          defer.resolve(data); 
        },function(error){
          defer.reject(error);
        })
        return defer.promise;
      },

      sendHighData:function(obj){
        var defer = $q.defer(); 
          var url="Macintosh HD\Users\mukuljuneja\Desktop\novus softwares\novus-web/app/views";
        $http.get(url)
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
