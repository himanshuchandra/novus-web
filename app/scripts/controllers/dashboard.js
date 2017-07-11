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

    $scope.hideDashboard = false;
    $scope.caseDetails = true;

    $scope.loadFirst = function () {
      if (webindex.loggedIn != true) {
        $window.location.reload();
        $window.location.assign(requrl + "/#/login");
      }
      else{
        $scope.loadData();
      }
    };

    var unregister = $scope.$watch(function () { return webindex.loaded }, function (newValue, oldValue) {
      if (!angular.equals(webindex.loaded, false)) {
        $scope.loadFirst();
        unregister();
      }
    }, true);

    //////////Load cases
    $scope.loadData = function () {

      var promise = dashboard.loadData();
      promise.then(function (data) {
        if (data.data != undefined) {
          
          for (var i = 0; i < data.data.length; i++) {
            var judgements = data.data[i].judgements;
            var jArray = judgements.split(',');
            data.data[i].jArray = jArray;
          }
          $scope.cases = data.data;
          console.log(data.data);
          webindex.userData.cases=data.data.length;

        }
        else {
          $scope.dashboardMessage = "No cases yet";
        }
      }, function (error) {
        $scope.dashboardMessage = "Error loading data";
      });

    };

    

    /////////////Control ng-repeat 
    $scope.hideId = 0;

    $scope.showCasesButton = function (caseObj) {
      $scope.cdetails = caseObj;
      $scope.hideDashboard = true;
      $scope.caseDetails = false;
    };


    $scope.showDetailsButton = function () {
      $scope.hideDashboard = false;
      $scope.caseDetails = true;
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
    $scope.printDiv = function () {
      var divToPrint = document.getElementById('printDiv');
      var newWin = window.open("");
      newWin.document.write(divToPrint.outerHTML);
      newWin.print();
      newWin.close();
    }

  });
