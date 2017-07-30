'use strict';

/**
 * @ngdoc function
 * @name novusApp.controller:WebindexCtrl
 * @description
 * # WebindexCtrl
 * Controller of the novusApp
 */



angular.module('novusApp')
    .controller('WebindexCtrl', function ($scope, webindex, requrl, $window, $timeout, $rootScope, $location, $route, phpurl) {


        $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
            if (webindex.loaded === true) {
                if ($location.path() === '/login' || $location.path() === '/signup' || $location.path() === '/forgotpassword' || $location.path() === '/') {
                    if (webindex.loggedIn === true) {
                        // $window.location.reload();
                        $window.location.assign(requrl + '/#/dashboard');
                    }
                }
                else if ($location.path() === '/dashboard' ||
                    $location.path() === '/addcase' ||
                    $location.path() === '/profile' ||
                    $location.path() === '/calendar' ||
                    $location.path() === '/taskmanager' ||
                    $location.path() === '/') {
                    if (webindex.loggedIn != true) {
                        // $window.location.reload();
                        $window.location.assign(requrl + '/#/login');
                    }
                }
            }
        });

        $scope.loginStatus = "Login/SignUp";
        $scope.ActivationStatus = true;
        $scope.LoginButton = false;
        $scope.SignupButton = false;
        $scope.ProfileButton = true;
        $scope.LogoutButton = true;
        $scope.sideBar = true;
        $scope.headerHide = true;

        $scope.ActivationMessage = undefined;

        $scope.loadData = function () {
            var promise = webindex.checkStatus();
            promise.then(function (data) {
                console.log(data);
                if (data.data === "") {
                    // $scope.loginStatus = "";
                    webindex.loggedIn = false;
                    $scope.headerHide = true;
                    if ($location.path() === '/dashboard' || $location.path() === '/addcase' || $location.path() === '/') {
                        // $window.location.reload();
                        $window.location.assign(requrl + '/#/login');
                    }
                }
                else {
                    if ($location.path() === '/login' || $location.path() === '/signup' || $location.path() === '/forgotpassword' || $location.path() === '/') {
                        console.log("4");
                        // $window.location.reload();
                        $window.location.assign(requrl + '/#/dashboard');
                    }
                    webindex.loggedIn = true;
                    $scope.headerHide = false;
                    webindex.userData = data.data[0];

                    if (data.data[0].userStatus != 'Y') {
                        $scope.Status = "Your Email address " + data.data[0].email + " is not Verified";
                        $scope.ActivationStatus = false;
                    }
                    $scope.LoginButton = true;
                    $scope.SignupButton = true;
                    $scope.ProfileButton = false;
                    $scope.LogoutButton = false;
                    $scope.sideBar = false;
                }
                // else{
                //     $scope.loginStatus="Login/SignUp";
                // }
                webindex.needReload = false;
                webindex.loaded = true;
            });
        };

        $scope.$watch(function () { return webindex.needReload }, function (newValue, oldValue) {
            if (webindex.needReload === true) {
                $scope.loadData();
            }
        }, true);

        ///////////notifications
        $scope.nlength = 0;
        $scope.updateNotif = function () {
            $scope.notifications = webindex.notifications;
            $scope.totalCases = $scope.totalCases + 1;
            $scope.nlength++;
        }

        $scope.$watch(function () { return webindex.notifications }, function (newValue, oldValue) {
            if (webindex.notifications.length > 0) {
                $scope.updateNotif();
            }
        }, true);

        $scope.$watch(function () { return webindex.userData }, function (newValue, oldValue) {
            $scope.totalCases = webindex.userData.Scases + webindex.userData.Hcases + webindex.userData.Dcases;
        }, true);

        ////////////////////////////
        $scope.sendLinkButton = false;

        $scope.SendActivationLink = function () {
            var promise = webindex.sendActivationLink();
            promise.then(function (data) {
                if (data.data.message === "success") {
                    $scope.ActivationMessage = "Link Sent. Wait for 1 minute to send new link";
                    $scope.sendLinkButton = true;
                    $timeout(function () {
                        $scope.sendLinkButton = false;
                        $scope.ActivationMessage = undefined;
                    }, 60000);
                }
                else if (data.data.message === "unknown") {
                    $window.location.reload();
                }
                else {
                    $scope.ActivationMessage = "Error,Try again Later";
                }
            }, function (error) {
                $scope.ActivationMessage = "Error,Try again Later";
            });
        };

        ///////////////////////////////
        $scope.Logout = function () {
            var promise = webindex.logout();
            promise.then(function (data) {
                console.log(data);
                $window.location.href = phpurl;
            }, function (error) {
                $scope.LogoutMessage = "Error,Try again Later";
            });
        };

        $scope.dshowCasesButton = function () {
            $window.location.assign(requrl + '/#/dashboard');
            $route.reload();
        };

    });
