'use strict';

/**
 * @ngdoc function
 * @name novusApp.controller:AddcaseCtrl
 * @description
 * # AddcaseCtrl
 * Controller of the novusApp
 */
angular.module('novusApp')
  .controller('AddcaseCtrl', function ($scope,addcase) {
    
    $scope.addCase={
        year:"",
    };

    $scope.supremeFormHide=true;

    $scope.showField=function(){
        $scope.supremeFormHide=false;
    };

    $scope.submitSupremeForm=function(supremeForm){
        if(supremeForm.$valid){
            $scope.supremeMessage="Searching...";
            $scope.sendSupremeData();
        }
        else{
            $scope.supremeMessage="Invalid info entered";
        }
    };

    $scope.sendSupremeData=function(){
        var supremeObject={
            year:$scope.addCase.year,
        };
    };

//    $scope.addcase={
//        hcstate:""
//    }
//
//$scope.loadOptions= function(){
//    var obj  = {
//        option: $scope.addcase.hcState , 
//        
//    };
//};


});
