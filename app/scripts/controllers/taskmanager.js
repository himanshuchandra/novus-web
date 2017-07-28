'use strict';

/**
 * @ngdoc function
 * @name novusApp.controller:TaskmanagerCtrl
 * @description
 * # TaskmanagerCtrl
 * Controller of the novusApp
 */
angular.module('novusApp')
    .controller('TaskmanagerCtrl', function ($scope, taskmanager, webindex, $window, requrl, $route) {

        $scope.dashboard = {
            nxtDate: "",
            nxtDateMessage: "",
            updated: false
        };

        $scope.hideDashboard = false;
        $scope.hideJudgeDetails = true;

        var unregister = $scope.$watch(function () { return webindex.loaded }, function (newValue, oldValue) {
            if (!angular.equals(webindex.loaded, false)) {
                $scope.loadJudges();
                unregister();
            }
        }, true);

        //////////Load judges

        $scope.supremeJudges = [];
        $scope.highJudges = [];
        $scope.districtJudges = [];
        $scope.allJudges = [];

        $scope.loadJudges = function () {

            var promise = taskmanager.loadJudges();
            promise.then(function (data) {
                console.log("judges", data.data);
                if (data.data != undefined) {
                    $scope.allJudges = data.data;
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].court === "Supreme Court") {
                            $scope.supremeJudges.push(data.data[i]);
                        }
                        else if (data.data[i].court === "High Court") {
                            $scope.highJudges.push(data.data[i]);
                        }
                        else if (data.data[i].court === "District Court") {
                            $scope.districtJudges.push(data.data[i]);
                        }
                    }
                    $scope.vJudges=$scope.allJudges;
                }
                else {
                  $scope.dataMessage = "No judges found!";
                }
            }, function (error) {
                $scope.dataMessage = "Error loading data!";
            });

        };


        /////////////Control ng-repeat
        $scope.hideId = 0;

        $scope.showDetailsButton = function (judge) {
            $scope.hideDashboard = true;
            $scope.hideJudgeDetails = false;
            $scope.judgeObject = judge;

        };

        $scope.showCasesButton = function () {
            $scope.hideDashboard = false;
            $scope.hideJudgeDetails = true;
        };

        $scope.showAllCases = function () {
           $scope.vJudges=$scope.allJudges;
           $scope.comingSoon=true;
        };

        $scope.showSupremeCases = function () {
            $scope.comingSoon=true;
            $scope.vJudges=$scope.supremeJudges;
        };

        $scope.showHighCases = function () {
            $scope.comingSoon=true;
            $scope.vJudges=$scope.highJudges;
        };

        $scope.comingSoon=true;
        $scope.showDistrictCases = function () {
            $scope.comingSoon=false;
           $scope.vJudges=$scope.districtJudges;
        };

        //////////Printing of case details logic
        $scope.printDiv = function (div) {
            var divToPrint = document.getElementById(div);
            var newWin = window.open("");
            newWin.document.write(divToPrint.outerHTML);
            newWin.print();
            newWin.close();
        }

    });
