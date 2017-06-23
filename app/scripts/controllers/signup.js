'use strict';

/**
 * @ngdoc function
 * @name novusApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the novusApp
 */
angular.module('novusApp')
  .controller('SignupCtrl',function ($scope,signup,webindex,$window,md5,requrl,profile,$timeout) {

    if(webindex.userData.useremail!=undefined){
        $window.location.assign(requrl);
    }

    //all ng-models declared
      $scope.signup={
        email:"",
        fname:"",
        lname:"",
        password1:"",
        password2:"",
        mobile:"",
        VCode:"",
    };
   

//////////////Enable Register code/////////
    $scope.isNotValid=true;
    $scope.enableRegister=function(regForm){
        if(regForm.$valid && passverified==true){
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
        if(regForm.$valid && passverified==true){
            $scope.result = "Checking..";
            $scope.doRegister();
        }
        else{
            $scope.result="Enter correct and full info";
        }
    };
    
    $scope.hashPassword=undefined;
   
    $scope.doRegister=function(){
        
        $scope.hashPassword=md5.createHash($scope.signup.password1);

        var userObject = {
            "email":$scope.signup.email,
            "fname":$scope.signup.fname,
            "lname":$scope.signup.lname,
            "mobile":$scope.signup.mobile,
            "password1":$scope.hashPassword,
        };
        
    //   var promise = signup.registerUser(userObject);
    //     promise.then(function(data){
    //        if(data.data.message==="success"){
               $timeout($scope.expire,60000);
               $scope.result=undefined;
               $scope.MobileForm=true;
               $scope.CodeForm=false;
        //        $scope.result = "Registered Successfully";
        //        $window.location.reload();
        //        $window.location.assign(requrl);
        //    }
        //    else if(data.data.message==="emailTaken"){
        //        $scope.result ="Email already registered!";
          // }  
        //    else{
        //        $scope.result = "Error occured! Try again later";
        //    }       
        // },function(error){
        //     $scope.result = "Error occured! Try again later";
        // });
    };

    $scope.expire=function(){
        $scope.MobileForm=false;
        $scope.CodeForm=true;  
        $scope.result="OTP expired!"
    };

    $scope.MobileForm=false;
    $scope.CodeForm=true;

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
            "email":$scope.signup.email,
            "fname":$scope.signup.fname,
            "lname":$scope.signup.lname,
            "mobile":$scope.signup.mobile,
            "password1":hashPassword,
            "VCode":$scope.signup.VCode,
        };

        // var promise=signup.verifyCode(CodeObject);
        // promise.then(function(data) {
        //   if(data.data.message==="success"){
              $scope.result="Registered successfully!";
        //     $scope.CodeMessage="Verified";
            
        //   }
        //   else if(data.data.message==="fail"){
        //     $scope.CodeMessage="Wrong Code entered";
        //   }
        //   else if(data.data.message==="unknown"){
        //     $scope.CodeMessage="Not LoggedIn";
        //     $window.location.reload();
        //   }
        //   else if(data.data.message==="exists"){
        //     $scope.CodeMessage=undefined;
        //     $scope.HideMobileForm=false;
        //     $scope.HideCodeForm=true;
        //     $scope.signup.VCode=undefined;
        //     $scope.MobileMessage="Mobile no. is already registered! Try another one";
         // }
        //   else{
        //     $scope.CodeMessage="Error! Try again later";
        //   }
        // },function(error) {
        //     $scope.CodeMessage="Error! Try again later";
        // });    
    };

    $scope.SendAgain=function(){
        $scope.signup.VCode=null;
        $scope.CodeMessage=undefined;
        $scope.result=undefined;
        $scope.MobileForm=false;
        $scope.CodeForm=true;
        $scope.signup.mobile=undefined;
    };


  });
