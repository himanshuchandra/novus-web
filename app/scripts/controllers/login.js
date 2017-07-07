'use strict';

/**
 * @ngdoc function
 * @name novusApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the novusApp
 */
angular.module('novusApp')
    .controller('LoginCtrl', function ($scope, login, webindex, $window, requrl, md5) {

        $scope.loadData = function () {
            if (webindex.loggedIn === true) {
                $window.location.reload();
                $window.location.assign(requrl + "/#/dashboard");
            }
        };

        var unregister = $scope.$watch(webindex.loaded, function (newValue, oldValue) {
            if (!angular.equals(webindex.loaded, false)) {
                $scope.loadData();
                unregister();
            }
        }, true);


        //all ng-models declared 
        $scope.login = {
            loginid: "",
            loginpassword: "",
            RememberMe: undefined
        };

        $scope.submitForm = function (loginForm) {
            if (loginForm.$valid) {
                $scope.result = "Checking..";
                $scope.doLogin();
            }
            else {
                $scope.result = "Invalid info.";
            }
        };


        $scope.doLogin = function () {

            var hashLoginPassword = md5.createHash($scope.login.loginpassword);

            var loginObject = {
                "loginid": $scope.login.loginid,
                "loginpassword": hashLoginPassword,
                "rememberMe": $scope.login.RememberMe
            };
            var promise = login.loginUser(loginObject);
            promise.then(function (data) {
                console.log(data);
                if (data.data === "success") {
                    $scope.result = "Logged in successfully";
                    $window.location.reload();
                    $window.location.assign(requrl + "/#/dashboard");
                }
                else if (data.data === "incorrectpassword") {
                    $scope.result = "Wrong Email/Username/Mobile or password";
                }
                else {
                    $scope.result = "Error occurred! Try again later.";
                }
            }, function (error) {
                $scope.result = "Error occurred! Try again later.";
            });
        };

    });
