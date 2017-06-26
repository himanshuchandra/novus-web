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
        state:"",
        Dstate:"",
        DCnumber:"",
        DCcaseyear:"",
       
    };
    $scope.ctype = [];
    $scope.court = [];
    $scope.dctype = [];
    $scope.supremeFormHide=true;
    $scope.highFormHide=true;
    $scope.districtFormHide=true;

    $scope.loadHCoptions=function(){

        var promise=addcase.loadHCoptions(obj);
        promise.then(function(data) {
            $scope.ctype=data.data[0].caseType;
        //   if(data.data.message==="unknown"){
        //     // $window.location.reload();
        //     $scope.HideMobileForm=true;
        //     $scope.HideCodeForm=false;
        //   }
        //   else if(data.data.message==="success"){
        //     $scope.HideMobileForm=true;
        //     $scope.HideCodeForm=false;
        //   }
        //   else{
        //     $scope.MobileMessage="Error! Try again later";
        //   }
        },function(error) {
            $scope.highMessage="Error loading options!";
        }); 
    };

    $scope.loadDCoptions1=function(){
        var promise=addcase.loadDCoptions1();
        promise.then(function(data) {
            console.log(data);
            $scope.court=data.data[1].caseType;
        //   if(data.data.message==="unknown"){
        //     // $window.location.reload();
        //     $scope.HideMobileForm=true;
        //     $scope.HideCodeForm=false;
        //   }
        //   else if(data.data.message==="success"){
        //     $scope.HideMobileForm=true;
        //     $scope.HideCodeForm=false;
        //   }
        //   else{
        //     $scope.MobileMessage="Error! Try again later";
        //   }
        },function(error) {
            $scope.highMessage="Error loading options!";
        }); 
    };

    $scope.loadDCoptions2=function(){
        var promise=addcase.loadDCoptions2();
        promise.then(function(data) {
            $scope.dctype=data.data[2].caseType;
        //   if(data.data.message==="unknown"){
        //     // $window.location.reload();
        //     $scope.HideMobileForm=true;
        //     $scope.HideCodeForm=false;
        //   }
        //   else if(data.data.message==="success"){
        //     $scope.HideMobileForm=true;
        //     $scope.HideCodeForm=false;
        //   }
        //   else{
        //     $scope.MobileMessage="Error! Try again later";
        //   }
        },function(error) {
            $scope.highMessage="Error loading options!";
        }); 
    };

    $scope.showFields = function(){
        var formfield = this.getAttribute("data-form");
        console.log(formfield);
    };
    
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
    };
    
    
    $scope.submitSupremeForm=function(supremeForm){
       
        if(supremeForm.$valid){
            $scope.supremeMessage="Searching...";

            obj={
                "diarynumber":1,
                "year":2017
            };
            $scope.sendSupremeData(obj);
        }
        else{
            $scope.supremeMessage="Invalid/Incomplete info entered";
        }
    };

    $scope.sendSupremeData=function(obj){
        var promise=addcase.sendSupremeData(obj);
        promise.then(function(data) {
            console.log(obj);
            // JSON.parse(data);
            // console.log(JSON.parse(data));
            console.log(data);
        //   if(data.data.message==="unknown"){
        //     // $window.location.reload();
        //     $scope.HideMobileForm=true;
        //     $scope.HideCodeForm=false;
        //   }
        //   else if(data.data.message==="success"){
        //     $scope.HideMobileForm=true;
        //     $scope.HideCodeForm=false;
        //   }
        //   else{
        //     $scope.MobileMessage="Error! Try again later";
        //   }
        },function(error) {
            // $scope.MobileMessage="Error! Try again later";
        }); 
    };
    
     $scope.submitDistrictForm=function(districtForm){
        if(districtForm.$valid && districtForm.state!=undefined && districtForm.ctype!=undefined && districtForm.dctype!=undefined){
            $scope.districtMessage="Searching...";

            obj={
                state:$scope.addCase.Dstate,
                court:$scope.addCase.court,
                type:$scope.addCase.dctype,
                number:$scope.addCase.DCnumber,
                year:$scope.addCase.DCcaseyear
            };
            $scope.sendDistrictData(obj);
        }
        else{
            $scope.districtMessage="Invalid/Incomplete info entered";
        }
    };

    $scope.sendDistrictData=function(obj){
        var promise=addcase.sendDistrictData(obj);
        promise.then(function(data) {
        //   if(data.data.message==="unknown"){
        //     // $window.location.reload();
        //     $scope.HideMobileForm=true;
        //     $scope.HideCodeForm=false;
        //   }
        //   else if(data.data.message==="success"){
        //     $scope.HideMobileForm=true;
        //     $scope.HideCodeForm=false;
        //   }
        //   else{
        //     $scope.MobileMessage="Error! Try again later";
        //   }
        },function(error) {
            // $scope.MobileMessage="Error! Try again later";
        }); 
    };


    $scope.submitHighForm=function(highForm){
        if(highForm.$valid && highForm.state!=undefined && highForm.ctype!=undefined ){
            $scope.highMessage="Searching...";

            obj={
                state:$scope.addCase.state,
                type:$scope.addCase.ctype,
                number:$scope.addCase.HCnumber,
                year:$scope.addCase.HCcaseyear
            };

            $scope.sendHighData(obj);
        }
        else{
            $scope.highMessage="Invalid/Incomplete info entered";
        }
    };

    $scope.sendHighData=function(obj){
        var promise=addcase.sendHighData(obj);
        promise.then(function(data) {
        //   if(data.data.message==="unknown"){
        //     // $window.location.reload();
        //     $scope.HideMobileForm=true;
        //     $scope.HideCodeForm=false;
        //   }
        //   else if(data.data.message==="success"){
        //     $scope.HideMobileForm=true;
        //     $scope.HideCodeForm=false;
        //   }
        //   else{
        //     $scope.MobileMessage="Error! Try again later";
        //   }
        },function(error) {
            // $scope.MobileMessage="Error! Try again later";
        });    
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
