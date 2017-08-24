'use strict';

/**
 * @ngdoc service
 * @name novusApp.dashboard
 * @description
 * # dashboard
 * Factory in the novusApp.
 */
angular.module('novusApp')
    .factory('taskmanager', function ($http, $q, phpurl) {

        var object = {

            loadJudges: function () {
                var defer = $q.defer();
                $http.post(phpurl + "/php/view_judge.php")
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
