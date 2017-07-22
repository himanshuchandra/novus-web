'use strict';

/**
 * @ngdoc service
 * @name novusApp.dashboard
 * @description
 * # dashboard
 * Factory in the novusApp.
 */
angular.module('novusApp')
    .factory('dashboard', function ($http, $q, phpurl) {

        var object = {

            loadSupreme: function () {
                var defer = $q.defer();
                $http.post(phpurl + "/php/view_sup.php")
                    .then(function (data) {
                        defer.resolve(data);
                    }, function (error) {
                        defer.reject(error);
                    })
                return defer.promise;
            },

            loadHigh: function () {
                var defer = $q.defer();
                $http.post(phpurl + "/php/view_high.php")
                    .then(function (data) {
                        defer.resolve(data);
                    }, function (error) {
                        defer.reject(error);
                    })
                return defer.promise;
            },

            loadDistrict: function () {
                var defer = $q.defer();
                $http.post(phpurl + "/php/view_dist.php")
                    .then(function (data) {
                        defer.resolve(data);
                    }, function (error) {
                        defer.reject(error);
                    })
                return defer.promise;
            },

            deleteCase: function (deleteObj) {
                var defer = $q.defer();
                $http.post(phpurl + "/php/delete.php",deleteObj)
                    .then(function (data) {
                        defer.resolve(data);
                    }, function (error) {
                        defer.reject(error);
                    })
                return defer.promise;
            },
        };

        return object;


    });
