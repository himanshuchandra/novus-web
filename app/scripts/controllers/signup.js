'use strict';

/**
 * @ngdoc function
 * @name novusApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the novusApp
 */
angular.module('novusApp')
  .controller('SignupCtrl',function ($scope,signup,webindex,$window,md5,requrl,profile) {

    if(webindex.userData.useremail!=undefined){
        $window.location.assign(requrl);
    }

    //all ng-models declared
      $scope.signup={
        useremail:"",
        username:"",
        password1:"",
        password2:"",
        newMobile:"",
        VCode:"",
    };
   
////////////Checking if username exists//////////////
    $scope.UsernameMessage=null;
    var isUsernameNew=false;

    $scope.checkUsername=function(regForm){
        $scope.isNotValid=true;
        isUsernameNew=false;
        if(regForm.validusername.$valid){
            $scope.UsernameMessage="Checking...";
            $scope.checkInDb(regForm);
        }
        else{
            $scope.UsernameMessage=null;
        }
    };

    $scope.checkInDb=function(regForm){

        var usernameObj = {
            "username":$scope.signup.username,
        };
        
      var promise = signup.checkUsername(usernameObj);
        promise.then(function(data){
           if(data.data.message==="found"){
               $scope.UsernameMessage = "Username Taken";
               isUsernameNew=false;
           }
           else{
               $scope.UsernameMessage = "Nice Choice!";
               isUsernameNew=true;
               $scope.enableRegister(regForm);
           }            
        },function(error){
            $scope.UsernameMessage = "Error occured! Try again later";
        });
    };

//////////////Enable Register code/////////
    $scope.isNotValid=true;
    $scope.enableRegister=function(regForm){
        if(regForm.$valid && passverified==true && isUsernameNew==true){
            $scope.isNotValid=false;
        }
        else{
            $scope.isNotValid=true;
        }
    };

//////////////Match Passwords //////////
    var passverified=false;
    $scope.checkp=function(regForm){
        $scope.isNotValid=true;
        if($scope.signup.password2!=undefined)
        {   
            if($scope.signup.password1===$scope.signup.password2)
            {   
                $scope.passtext="Passwords match";
                passverified=true;  
                $scope.enableRegister(regForm);
            }
  
            else if($scope.signup.password1==undefined){
                 $scope.passtext="";
                 passverified=false;
            }
            else{
                $scope.passtext="Passwords dont match";
                passverified=false;
            }
        }
    };
    
////////////////////Registering The user////////////////////////////////////    
    $scope.submitForm=function(regForm){
        if(regForm.$valid && passverified==true && isUsernameNew==true){
            $scope.result = "Checking..";
            $scope.doRegister();
        }
        else{
            $scope.result="Enter correct and full info";
        }
    };
       
   
    $scope.doRegister=function(){
        
        var hashPassword=md5.createHash($scope.signup.password1);

        var userObject = {
            "useremail":$scope.signup.useremail,
            "username":$scope.signup.username,
            "password1":hashPassword,
            "role":"customer"
        };
        
      var promise = signup.registerUser(userObject);
        promise.then(function(data){
           if(data.data.message==="pass"){
               $scope.result = "Registered Successfully";
               $window.location.reload();
               $window.location.assign(requrl);
           }
           else if(data.data.message==="usernameTaken"){
               $scope.UsernameMessage = "Username Taken";
               isUsernameNew=false;
               $scope.result ="Sorry!The username is already taken";
           }  
           else if(data.data.message==="emailTaken"){
               $scope.result ="Email already registered!";
           }  
           else{
               $scope.result = "Error occured! Try again later";
           }       
        },function(error){
            $scope.result = "Error occured! Try again later";
        });
    };

    $scope.MobileForm=false;
    $scope.HideMobileForm=false;
    $scope.HideCodeForm=true;

    $scope.submitMobileForm=function(mobileForm){
        if(mobileForm.$valid){
            $scope.MobileMessage="Sending..";
            $scope.ChangeMobile();
        }
        else{
          $scope.MobileMessage="Enter valid details";
        }
    };

    $scope.ChangeMobile=function(){
  
        var MobileObject={
          "MobileNumber":$scope.signup.newMobile,
        };

        var promise=profile.updateMobile(MobileObject);
        promise.then(function(data) {
          if(data.data.message==="unknown"){
            // $window.location.reload();
            $scope.HideMobileForm=true;
            $scope.HideCodeForm=false;
          }
          else if(data.data.message==="success"){
            $scope.HideMobileForm=true;
            $scope.HideCodeForm=false;
          }
          else{
            $scope.MobileMessage="Error! Try again later";
          }
        },function(error) {
            $scope.MobileMessage="Error! Try again later";
        });    
    };

    $scope.submitCode=function(codeForm){
      if(codeForm.$valid){
        $scope.CodeMessage="Checking Code..";
        $scope.VerifyCode();          
      }
      else{
        $scope.CodeMessage="Enter valid code";
      }
    };

    $scope.VerifyCode=function(){
        var CodeObject={
          "VCode":$scope.signup.VCode,
        };

        var promise=profile.verifyCode(CodeObject);
        promise.then(function(data) {
          if(data.data.message==="pass"){
            $scope.CodeMessage="Verified";
            
          }
          else if(data.data.message==="fail"){
            $scope.CodeMessage="Wrong Code entered";
          }
          else if(data.data.message==="unknown"){
            $scope.CodeMessage="Not LoggedIn";
            $window.location.reload();
          }
          else if(data.data.message==="exists"){
            $scope.CodeMessage=undefined;
            $scope.HideMobileForm=false;
            $scope.HideCodeForm=true;
            $scope.signup.VCode=undefined;
            $scope.MobileMessage="Mobile no. is already registered! Try another one";
          }
          else{
            $scope.CodeMessage="Error! Try again later";
          }
        },function(error) {
            $scope.CodeMessage="Error! Try again later";
        });    
    };

    $scope.SendAgain=function(){
        $scope.signup.VCode=null;
        $scope.CodeMessage=undefined;
        $scope.MobileMessage=undefined;
        $scope.HideMobileForm=false;
        $scope.HideCodeForm=true;
    };


  });
