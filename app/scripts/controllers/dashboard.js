'use strict';

/**
 * @ngdoc function
 * @name novusApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the novusApp
 */
angular.module('novusApp')
  .controller('DashboardCtrl', function ($scope, dashboard, webindex, $window, requrl) {

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
    $scope.districtCaseDetails = true;

    $scope.loadFirst = function () {
      if (webindex.loggedIn != true) {
        $window.location.reload();
        $window.location.assign(requrl + "/#/login");
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
            if (data.data[i].judgements != undefined) {
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

          // for (var i = 0; i < data.data.length; i++) {
          //   Object.keys(data.data[i]).forEach(function (key) {
          //     if(key.startsWith('final')){
          //       data.data[i][key]=$scope.splitString(data.data[i][key]);
          //     }
          //   });
          // }
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
            Object.keys(data.data[i]).forEach(function (key) {
              if(key.startsWith('final')){
                data.data[i][key]=$scope.splitString(data.data[i][key]);
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
