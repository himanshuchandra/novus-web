'use strict';

/**
 * @ngdoc function
 * @name novusApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the novusApp
 */
angular.module('novusApp')
  .controller('DashboardCtrl', function ($scope,dashboard) {
    
////////////Loadi cases
    $scope.loadData=function(){

      var promise=dashboard.loadData();
      promise.then(function(data){
        if(data.data!=undefined){
          $scope.cases=data.data;
        }
        else{
          $scope.dashboardMessage="No cases yet";
        }
      },function(error){
          $scope.dashboardMessage="Error loading data";
      });      

    };

    $scope.loadData();

/////////////Control ng-repeat 
    $scope.hideId=0;

    $scope.showCasesButton=function(caseId){
        if($scope.hideId===caseId){
            $scope.hideId=0;
        }
        else{
            $scope.hideId=caseId;
        }
    }

    $scope.hideApplicants=0;
    $scope.approvedText=0;

    $scope.showApplicants=function(caseId){
        if($scope.hideApplicants!=caseId && approvedUsers.length<1){
            $scope.hideApplicants=0;
            $scope.approvedText=caseId;
        }
        else if($scope.hideApplicants===caseId){
            $scope.hideApplicants=0;
        }
        else{
            $scope.hideApplicants=caseId;
        }
    };


  });
