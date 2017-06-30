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
    

    $scope.dashboard={
    
    };
  
    $scope.hideDashboard=false;
    $scope.caseDetails=true;


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

    $scope.showCasesButton=function(caseObj){
       $scope.cdetails=caseObj;
       $scope.hideDashboard=true;
       $scope.caseDetails=false;
    };

    
    $scope.showDetailsButton=function(){
       $scope.hideDashboard=false;
       $scope.caseDetails=true;
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


  });
