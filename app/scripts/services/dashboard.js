'use strict';

/**
 * @ngdoc service
 * @name novusApp.dashboard
 * @description
 * # dashboard
 * Factory in the novusApp.
 */
angular.module('novusApp')
  .factory('dashboard', function ($http,$q) {
    
    var object={

      loadData:function(){
          var defer = $q.defer(); 
          // $http.post(requrl+'/login/login',loginObject)
          $http.post("http://ec2-13-126-216-58.ap-south-1.compute.amazonaws.com/php/view_data.php")
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
