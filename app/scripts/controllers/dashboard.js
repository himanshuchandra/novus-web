'use strict';

/**
 * @ngdoc function
 * @name novusApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the novusApp
 */
angular.module('novusApp')
  .controller('DashboardCtrl', function ($scope, dashboard, webindex, $window, requrl, $route) {

    $scope.deleteImg = () => {
      alert("hey");
    }

    $scope.dashboard = {
    };

    $scope.supremeCasesHide = false;
    $scope.highCasesHide = false;
    $scope.districtCasesHide = false;

    $scope.hideDashboard = false;
    $scope.supremeCaseDetails = true;
    $scope.districtCaseDetails = true;
    $scope.highCaseDetails = true;

    $scope.loadFirst = function () {
      if (webindex.loggedIn != true) {
        // $window.location.reload();
        // $window.location.assign(requrl);
      }
      else {
        $scope.loadSupreme();
        $scope.loadHigh();
        $scope.loadDistrict();
      }
    };

    var unregister = $scope.$watch(function () { return webindex.loaded }, function (newValue, oldValue) {
      if (!angular.equals(webindex.loaded, false)) {
        $scope.loadFirst();
        unregister();
      }
    }, true);

    //////////Load cases
    $scope.loadSupreme = function () {

      var promise = dashboard.loadSupreme();
      promise.then(function (data) {
        console.log("supreme", data.data);
        if (data.data != undefined) {

          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].judgements != undefined && data.data[i].judgements != "" && data.data[i].judgements.length > 5) {
              data.data[i].judgements = data.data[i].judgements.replace(/['"]+/g, '');
              var judgements = data.data[i].judgements;
              var jArray = judgements.split(',');
              data.data[i].jArray = jArray;
            }
          }
          $scope.Scases = data.data;

          webindex.userData.Scases = data.data.length;
          console.log(webindex.userData);
        }
        else {
          $scope.supremeMessage = "No Supreme court cases yet";
        }
      }, function (error) {
        $scope.supremeMessage = "Error loading data";
      });

    };

    $scope.loadHigh = function () {

      var promise = dashboard.loadHigh();
      promise.then(function (data) {
        console.log("high", data.data);
        if (data.data != undefined) {

          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].file_path != undefined) {
              data.data[i].file_path = data.data[i].file_path.replace(/['"]+/g, '');
              data.data[i].file_path = $scope.splitString(data.data[i].file_path);
            }
          }

          $scope.Hcases = data.data;

          webindex.userData.Hcases = data.data.length;
          console.log(webindex.userData);
        }
        else {
          $scope.highMessage = "No High court cases yet";
        }
      }, function (error) {
        $scope.highMessage = "Error loading data";
      });

    };

    $scope.splitString = function (string) {
      if (string != undefined) {
        var array = string.split(',');
        return array;
      }
    };

    $scope.loadDistrict = function () {

      var promise = dashboard.loadDistrict();
      promise.then(function (data) {
        console.log("district", data.data);
        if (data.data != undefined) {

          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].petitioner_and_advocate != undefined) {
              data.data[i].pt = data.data[i].petitioner_and_advocate.slice(3, 11);
            }
            if (data.data[i].respondent_and_advocate != undefined) {
              data.data[i].rs = data.data[i].respondent_and_advocate.slice(3, 11);
            }
            Object.keys(data.data[i]).forEach(function (key) {
              if (key.startsWith('final') && data.data[i][key] != undefined) {
                data.data[i][key] = data.data[i][key].replace(/['"]+/g, '');
                data.data[i][key] = $scope.splitString(data.data[i][key]);
              }
            });
          }
          $scope.Dcases = data.data;

          webindex.userData.Dcases = data.data.length;
          console.log(webindex.userData);
        }
        else {
          $scope.districtMessage = "No District court cases yet";
        }
      }, function (error) {
        $scope.districtMessage = "Error loading data";
      });

    };


    /////////////Control ng-repeat 
    $scope.hideId = 0;

    $scope.showDetailsButton = function (caseObj, type) {
      $scope.hideDashboard = true;
      if (type === 's') {
        $scope.scdetails = caseObj;
        $scope.supremeCaseDetails = false;
      }
      else if (type === 'h') {
        $scope.hcdetails = caseObj;
        $scope.highCaseDetails = false;
      }
      else if (type === 'd') {
        $scope.dcdetails = caseObj;
        $scope.districtCaseDetails = false;
      }

    };


    $scope.showCasesButton = function () {
      $scope.hideDashboard = false;
      $scope.supremeCaseDetails = true;
      $scope.highCaseDetails = true;
      $scope.districtCaseDetails = true;
    };

    $scope.dshowCasesButton = function () {
      console.log("inside dashboard controller");
      $window.location.assign(requrl+'/#/dashboard');
      $route.reload();
    };

    $scope.showAllCases = function () {
      $scope.supremeCasesHide = false;
      $scope.highCasesHide = false;
      $scope.districtCasesHide = false;
    };

    $scope.showAllCases();

    $scope.showSupremeCases = function () {
      $scope.supremeCasesHide = false;
      $scope.highCasesHide = true;
      $scope.districtCasesHide = true;
    };

    $scope.showHighCases = function () {
      $scope.supremeCasesHide = true;
      $scope.highCasesHide = false;
      $scope.districtCasesHide = true;
    };

    $scope.showDistrictCases = function () {
      $scope.supremeCasesHide = true;
      $scope.highCasesHide = true;
      $scope.districtCasesHide = false;
    };

    $scope.deleteThis = function (deleteObj) {
      console.log("deleteObj", deleteObj);
      var promise = dashboard.deleteCase(deleteObj);
      promise.then(function (data) {

        if (data.data === 'success') {
          $route.reload();
        }
        else {
          window.alert("Error deleteing case! Please try again later.");
        }
      }, function (error) {
        window.alert("Error deleteing case! Please try again later.");
      });
    };


    $scope.deleteObj = {};
    $scope.deleteCase = function (caseData, type) {
      if (type === 's') {
        $scope.deleteObj = {};
        $scope.deleteObj.diary_number = caseData.diary_number;
        $scope.deleteObj.year = caseData.year;
        $scope.deleteThis($scope.deleteObj);
      }
      else if (type === 'h') {
        $scope.deleteObj = {};
        $scope.deleteObj.state = caseData.state_name;
        $scope.deleteObj.type = caseData.case_type;
        $scope.deleteObj.number = caseData.case_number;
        $scope.deleteObj.year = caseData.case_year;
        $scope.deleteThis($scope.deleteObj);
      }
      else if (type === 'd') {
        $scope.deleteObj = {};
        $scope.deleteObj.state = caseData.state_name;
        $scope.deleteObj.court = caseData.court_number;
        $scope.deleteObj.type = caseData.case_type;
        $scope.deleteObj.number = caseData.case_number;
        $scope.deleteObj.year = caseData.case_year;
        $scope.deleteObj.district = caseData.district_code;
        $scope.deleteThis($scope.deleteObj);
      }

    };

    // $scope.hideApplicants=0;
    // $scope.approvedText=0;

    // $scope.showApplicants=function(sNo){
    //     if($scope.hideApplicants!=sNo && approvedUsers.length<1){
    //         $scope.hideApplicants=0;
    //         $scope.approvedText=sNo;
    //     }
    //     else if($scope.hideApplicants===sNo){
    //         $scope.hideApplicants=0;
    //     }
    //     else{
    //         $scope.hideApplicants=sNo;
    //     }
    // };
    $scope.printDiv = function (div) {
      var divToPrint = document.getElementById(div);
      var newWin = window.open("");
      newWin.document.write(divToPrint.outerHTML);
      newWin.print();
      newWin.close();
    }

  });
