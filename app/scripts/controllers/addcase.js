'use strict';

/**
 * @ngdoc function
 * @name novusApp.controller:AddcaseCtrl
 * @description
 * # AddcaseCtrl
 * Controller of the novusApp
 */
angular.module('novusApp')
    .controller('AddcaseCtrl', function ($scope, addcase, webindex, $window, requrl) {
        var obj;
        $scope.addCase = {
            year: "",
            Dnumber: "",
            HCcaseyear: "",
            HCnumber: "",
            state: "",
            Dstate: "",
            DCnumber: "",
            DCcaseyear: "",

        };
        $scope.ctype = [];
        $scope.court = [];
        $scope.dctype = [];
        $scope.supremeFormHide = true;
        $scope.highFormHide = true;
        $scope.districtFormHide = true;

        // $scope.loadFirst = function () {
        //   if (webindex.loggedIn != true) {
        //     $window.location.reload();
        //     $window.location.assign(requrl);
        //   }
        // };

        // var unregister = $scope.$watch(function () { return webindex.loaded }, function (newValue, oldValue) {
        //   if (!angular.equals(webindex.loaded, false)) {
        //     $scope.loadFirst();
        //     unregister();
        //   }
        // }, true);



        $scope.loadHCoptions = function () {

            var hcObj = {
                "state": $scope.addCase.state
            }

            var promise = addcase.loadHCoptions(hcObj);
            promise.then(function (data) {
                console.log(hcObj, data);
                $scope.ctypeArray = [];
                for (var i = 0; i < data.data.length; i++) {
                    $scope.ctypeArray.push(data.data[i].case_type_code);
                }
                $scope.ctype = $scope.ctypeArray;

            }, function (error) {
                $scope.highMessage = "Error loading options!";
            });
        };

        $scope.loadDCoptions1 = function () {
            var dcObj1 = {
                "state": $scope.addCase.Dstate
            }

            var promise = addcase.loadDCoptions1(dcObj1);
            promise.then(function (data) {
                console.log(dcObj1, data);
                $scope.courtNames = [];
                for (var i = 0; i < data.data.length; i++) {
                    $scope.courtNames.push(data.data[i].Court_Name);
                }
                $scope.court = $scope.courtNames;
                $scope.allCourts = data.data;

            }, function (error) {
                $scope.highMessage = "Error loading options!";
            });
        };

        $scope.loadDCoptions2 = function () {
            var dcObj2 = {
                "court": $scope.addCase.court
            }
            var promise = addcase.loadDCoptions2(dcObj2);
            promise.then(function (data) {
                console.log(dcObj2, data);
                $scope.caseTypes = [];
                for (var i = 0; i < data.data.length; i++) {
                    $scope.caseTypes.push(data.data[i].Case_Type);
                }
                $scope.dctype = $scope.caseTypes;
                $scope.allCaseTypes = data.data;

            }, function (error) {
                $scope.highMessage = "Error loading options!";
            });
        };

        $scope.showFields = function () {
            var formfield = this.getAttribute("data-form");
            console.log(formfield);
        };

        $scope.showSCField = function () {

            $scope.supremeFormHide = false;
            $scope.highFormHide = true;
            $scope.districtFormHide = true;
        };

        $scope.showHCField = function () {
            $scope.supremeFormHide = true;
            $scope.highFormHide = false;
            $scope.districtFormHide = true;
        };

        $scope.showDCField = function () {
            $scope.supremeFormHide = true;
            $scope.highFormHide = true;
            $scope.districtFormHide = false;
        };


        $scope.submitSupremeForm = function (supremeForm) {

            if (supremeForm.$valid) {
                $scope.supremeMessage = "Searching...";

                obj = {
                    "diarynumber": $scope.addCase.Dnumber,
                    "year": $scope.addCase.year
                };
                $scope.sendSupremeData(obj);
            }
            else {
                $scope.supremeMessage = "Invalid/Incomplete info entered";
            }
        };

        $scope.sendSupremeData = function (obj) {
            var promise = addcase.sendSupremeData(obj);
            promise.then(function (data) {
                if (data.data === "success") {
                    $scope.supremeMessage = "Added successfully to dashboard";
                }
                else if (data.data === "aadded") {
                    $scope.supremeMessage = "Already exists";
                }
                else {
                    $scope.supremeMessage = "Error adding!Try again later.";
                }

                console.log(obj);

                console.log(data);

            }, function (error) {
                $scope.supremeMessage = "Error adding!Try again later.";
            });
        };

        $scope.submitDistrictForm = function (districtForm) {
            if (districtForm.$valid && $scope.addCase.Dstate != undefined && $scope.addCase.dctype != undefined && $scope.addCase.court != undefined) {
                $scope.districtMessage = "Searching...";

                var cindex = $scope.courtNames.indexOf($scope.addCase.court);
                var courtId = $scope.allCourts[cindex].Court_ID;
                var district = $scope.allCourts[cindex].District_ID;

                var dindex = $scope.caseTypes.indexOf($scope.addCase.dctype);
                var caseTypeId = $scope.allCaseTypes[dindex].Case_ID;

                obj = {
                    state: $scope.addCase.Dstate,
                    court: courtId,
                    type: caseTypeId,
                    number: $scope.addCase.DCnumber,
                    year: $scope.addCase.DCcaseyear,
                    district: district
                };
                $scope.sendDistrictData(obj);
            }
            else {
                $scope.districtMessage = "Invalid/Incomplete info entered";
            }
        };

        $scope.sendDistrictData = function (obj) {
            var promise = addcase.sendDistrictData(obj);
            promise.then(function (data) {
                console.log("sent data", obj);
                console.log("received data", data.data);
                if (data.data === "success") {
                    $scope.districtMessage = "Added successfully to dashboard";
                }
                else if (data.data === "aadded") {
                    $scope.districtMessage = "Already exists";
                }
                else {
                    $scope.districtMessage = "Error adding!Try again later.";
                }

            }, function (error) {
                $scope.districtMessage = "Error! Try again later";
            });
        };


        $scope.submitHighForm = function (highForm) {
            if (highForm.$valid && highForm.state != undefined && highForm.ctype != undefined) {
                $scope.highMessage = "Searching...";

                obj = {
                    state: $scope.addCase.state,
                    type: $scope.addCase.ctype,
                    number: $scope.addCase.HCnumber,
                    year: $scope.addCase.HCcaseyear
                };

                $scope.sendHighData(obj);
            }
            else {
                $scope.highMessage = "Invalid/Incomplete info entered";
            }
        };

        $scope.sendHighData = function (obj) {
            var promise = addcase.sendHighData(obj);
            promise.then(function (data) {
                console.log("sent data", obj);
                console.log("received data", data.data);
                if (data.data === "success") {
                    $scope.highMessage = "Added successfully to dashboard";
                }
                else if (data.data === "aadded") {
                    $scope.highMessage = "Already exists";
                }
                else {
                    $scope.highMessage = "Error adding!Try again later.";
                }

            }, function (error) {
                $scope.highMessage = "Error adding!Try again later.";
            });
        };


    });
