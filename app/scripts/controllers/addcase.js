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
   var obj;
    $scope.addCase={
        year:"",
        Dnumber:"",
        HCcaseyear:"",
        HCnumber:"",
        HCcaseyear:"",
        state:"",
        Dstate:"delhi",
        DCnumber:"",
        DCcaseyear:"",
        DCnumber:"",
        DCcaseyear:"",
       
    };
    $scope.ctype = ["Emil", "Tobias", "Linus"];
    $scope.court = ["abc","xyz","xyz(east)"];
    $scope.dctype = ["legal","martial","criminal"];
    $scope.supremeFormHide=true;
    $scope.highFormHide=true;
    $scope.districtFormHide=true;
        
    $scope.showFields = function(){
        var formfield = this.getAttribute("data-form");
        console.log(formfield);
    }
    
    $scope.showSCField=function(){
        
        $scope.supremeFormHide=false;
           $scope.highFormHide=true;
        $scope.districtFormHide=true;
    };
    
    $scope.showHCField=function(){
           $scope.supremeFormHide=true;
           $scope.highFormHide=false;
           $scope.districtFormHide=true;
    };
    
    $scope.showDCField = function(){
        $scope.supremeFormHide=true;
           $scope.highFormHide=true;
           $scope.districtFormHide=false;
    }
    
    
    $scope.submitSupremeForm=function(supremeForm){
       
        if(supremeForm.$valid){
            $scope.supremeMessage="Searching...";
//            $scope.sendSupremeData();
            obj={
                diarynumber:$scope.addCase.Dnumber,
                year:$scope.addCase.year
            };
        }
        else{
            $scope.supremeMessage="Invalid info entered";
        }
    };
    
     $scope.submitDistrictForm=function(districtForm){
        if(districtForm.$valid){
            $scope.districtMessage="Searching...";
//            $scope.sendSupremeData();
            obj={
                state:$scope.addCase.Dstate,
                court:$scope.addCase.court,
                type:$scope.addCase.dctype,
                number:$scope.addCase.DCnumber,
                year:$scope.addCase.DCcaseyear
            };
        }
        else{
            $scope.districtMessage="Invalid info entered";
        }
    };
    $scope.submitHighForm=function(highForm){
        if(highForm.$valid){
            $scope.highMessage="Searching...";
//            $scope.sendHighData();
            obj={
                state:$scope.addCase.state,
                type:$scope.addCase.ctype,
                number:$scope.addCase.HCnumber,
                year:$scope.addCase.HCcaseyear
            };
        }
        else{
            $scope.highMessage="Invalid info entered";
        }
    };
    
//    $scope.yes = ()=>{
//        console.log(Dobj);
//    }

//    $scope.sendSupremeData=function(){
//        var supremeObject={
//            year:$scope.addCase.year,
//        };
//    };
//    
//    $scope.sendHighData()=function(){
//      var   
//    };

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
