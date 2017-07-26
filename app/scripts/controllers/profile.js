'use strict';

/**
 * @ngdoc function
 * @name novusApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the novusApp
 */
angular.module('novusApp')
    .controller('ProfileCtrl', function ($scope, $window, webindex, profile, md5, requrl, $route, Upload) {

        //all ng-models declared
        $scope.profile = {
            oldPassword: "",
            newPassword: "",
            newPassword2: "",
            pic: "",
        };

        ///////////////////////////////


        $scope.PasswordForm = true;
        $scope.uploadPicForm = true;
        $scope.toggleButton = false;
        $scope.uploadButton = "Upload image";
        $scope.profileUrl = "/User_data/" + webindex.userData.useremail + "profile.jpeg";

        //////Loading data from index service

        $scope.checkLogin= function () {
            if (webindex.loggedIn != true) {
                $window.location.reload();
                $window.location.assign(requrl);
            }
            else{
                console.log("Profile data",webindex.userData);
                $scope.Email=webindex.userData.email;
                $scope.Fname=webindex.userData.fname;
                $scope.Lname=webindex.userData.lname;
                $scope.Mobile=webindex.userData.mobile;
                $scope.TotalCases=webindex.userData.Scases+webindex.userData.Hcases+webindex.userData.Dcases;
            }
        };

        var unregister = $scope.$watch(function () { return webindex.loaded }, function (newValue, oldValue) {
            if (!angular.equals(webindex.loaded, false)) {
                $scope.checkLogin();
                unregister();
            }
        }, true);

        $scope.$watch(function () { return webindex.userData }, function (newValue, oldValue) {
            $scope.TotalCases = webindex.userData.Scases + webindex.userData.Hcases + webindex.userData.Dcases;
        }, true);

        // $scope.loadData=function(){
        //     if(webindex.userData.useremail!=undefined){
        //         var print=webindex.userData;
        //         $scope.Email=print.useremail;
        //         $scope.uName=print.username;

        //     }
        //     else{
        //         $window.location.reload();
        //         $window.location.assign(requrl+"/#/login");
        //     }
        // };

        // var unregister=$scope.$watch(webindex.loaded,function(newValue,oldValue){
        //     if(!angular.equals(webindex.loaded, false)){
        //         $scope.loadData();
        //         unregister();
        //     }
        // },true);


        $scope.$watch(function(){return webindex.userData},function(newValue,oldValue){
            if(!angular.equals(webindex.userData, {})){
                console.log("Profile data changed",webindex.userData);
                $scope.loadData();
            }
        },true);



        //////////// Show-Hide form button logic  ////////


        // $scope.ShowMobileForm=function(){
        //   $scope.MobileForm=false;
        //   $scope.MobileFormButton=true;

        //   $scope.PasswordFormButton=false;
        //   $scope.PasswordForm=true;

        //   $scope.toggleButton=false;

        //   $scope.uploadPicForm=true;
        //   $scope.uploadButton="Upload image";
        // }

        $scope.ShowPasswordForm = function () {
            $scope.PasswordForm = false;
            $scope.PasswordFormButton = true;

            // $scope.MobileFormButton=false;
            // $scope.MobileForm=true;

            $scope.toggleButton = false;

            $scope.uploadPicForm = true;
            $scope.uploadButton = "Upload image";
        }


        $scope.toggleImageForm = function () {

            // $scope.MobileFormButton=false;
            //  $scope.MobileForm=true;
            $scope.PasswordFormButton = false;
            $scope.PasswordForm = true;

            if ($scope.uploadPicForm == true) {
                $scope.uploadPicForm = false;
                $scope.uploadButton = "Cancel";
            }
            else {
                $scope.uploadPicForm = true;
                $scope.uploadButton = "Upload image";
            }
        };


        ///////////////Add/Change Mobile no. logic ////////////////
        $scope.MobileForm = true;
        $scope.MobileFormButton = true;
        $scope.HideMobileForm = true;
        $scope.HideCodeForm = true;

        // $scope.submitMobileForm=function(mobileForm){
        //     if(mobileForm.$valid){
        //         $scope.MobileMessage="Sending..";
        //         $scope.ChangeMobile();
        //     }
        //     else{
        //       $scope.MobileMessage="Enter valid details";
        //     }
        // };

        // $scope.ChangeMobile=function(){

        //     var MobileObject={
        //       "CountryCode":"+"+$scope.profile.countryCode,
        //       "MobileNumber":$scope.profile.newMobile,
        //     };

        //     var promise=profile.updateMobile(MobileObject);
        //     promise.then(function(data) {
        //       if(data.data.message==="unknown"){
        //         $window.location.reload();
        //       }
        //       else if(data.data.message==="success"){
        //         $scope.HideMobileForm=true;
        //         $scope.HideCodeForm=false;
        //       }
        //       else{
        //         $scope.MobileMessage="Error! Try again later";
        //       }
        //     },function(error) {
        //         $scope.MobileMessage="Error! Try again later";
        //     });
        // };

        // $scope.submitCode=function(codeForm){
        //   if(codeForm.$valid){
        //     $scope.CodeMessage="Checking Code..";
        //     $scope.VerifyCode();
        //   }
        //   else{
        //     $scope.CodeMessage="Enter valid code";
        //   }
        // };

        // $scope.VerifyCode=function(){
        //     var CodeObject={
        //       "VCode":$scope.profile.VCode,
        //     };

        //     var promise=profile.verifyCode(CodeObject);
        //     promise.then(function(data) {
        //       if(data.data.message==="pass"){
        //         $scope.CodeMessage="Verified & Updated";
        //         webindex.needReload=true;
        //         $route.reload();
        //       }
        //       else if(data.data.message==="fail"){
        //         $scope.CodeMessage="Wrong Code entered";
        //       }
        //       else if(data.data.message==="unknown"){
        //         $scope.CodeMessage="Not LoggedIn";
        //         $window.location.reload();
        //       }
        //       else if(data.data.message==="exists"){
        //         $scope.CodeMessage=undefined;
        //         $scope.HideMobileForm=false;
        //         $scope.HideCodeForm=true;
        //         $scope.profile.VCode=undefined;
        //         $scope.MobileMessage="Mobile no. is already registered! Try another one";
        //       }
        //       else{
        //         $scope.CodeMessage="Error! Try again later";
        //       }
        //     },function(error) {
        //         $scope.CodeMessage="Error! Try again later";
        //     });
        // };

        // $scope.SendAgain=function(){
        //     $scope.profile.VCode=null;
        //     $scope.CodeMessage=undefined;
        //     $scope.MobileMessage=undefined;
        //     $scope.HideMobileForm=false;
        //     $scope.HideCodeForm=true;
        // };

        /////////// Change Password Logic /////////////////
        var arePasswordsSame = false;

        $scope.checkPassword = function () {
            if ($scope.profile.newPassword2 != undefined) {
                if ($scope.profile.newPassword === $scope.profile.newPassword2) {
                    $scope.PasswordMessage = "Passwords match";
                    arePasswordsSame = true;
                }
                else if ($scope.profile.newPassword == undefined) {
                    $scope.PasswordMessage = undefined;
                    arePasswordsSame = false;
                }
                else {
                    $scope.PasswordMessage = "Passwords dont match";
                    arePasswordsSame = false;
                }
            }
        };

        $scope.submitPasswordForm = function (passForm) {
            if (passForm.$valid && arePasswordsSame == true) {
                $scope.changePassword();
                $scope.PasswordResult = "Updating Password";
            }
            else {
                $scope.PasswordResult = "Enter correct passwords";
            }
        };

        $scope.changePassword = function () {

            var hashOldPassword = md5.createHash($scope.profile.oldPassword);
            var hashNewPassword = md5.createHash($scope.profile.newPassword);
            var passwordObject = {
                "oldpassword": hashOldPassword,
                "password1": hashNewPassword,
            };

            var promise = profile.setNewPassword(passwordObject);
            promise.then(function (data) {
                if (data.data.message === "success") {
                    $scope.PasswordResult = "Updated";
                    $route.reload();
                }
                else if (data.data.message === "unknown") {
                    $scope.PasswordResult = "Not LoggedIn";
                    $window.location.reload();
                }
                else if (data.data.message === "fail") {
                    $scope.PasswordResult = "Old Password is not correct";
                }
                else {
                    $window.location.reload();
                }
            }, function (error) {
                $scope.PasswordResult = "Error occured! Try again later";
            });
        };


        ////////////// Profile pic upload //////////////
        $scope.uploadPic = function () {
            if ($scope.uploadForm.file.$valid && $scope.profile.pic) {
                $scope.upload($scope.profile.pic);
                $scope.picMessage = "Uploading.."
            }
            else {
                $scope.picMessage = "Invalid image";
            }
        }

        $scope.upload = function (file) {
            Upload.upload({
                url: requrl + '/profile/uploadPic', //webAPI exposed to upload the file
                data: { file: file }               //pass file as data, should be user ng-model
            }).then(function (data) {
                if (data.data.message === "success") {
                    $scope.picMessage = "Upload successfull";
                    var random = (new Date()).toString();
                    $scope.profileUrl = $scope.profileUrl + "?cb=" + random;
                    $scope.uploadPicForm = true;
                    $scope.uploadButton = "Upload";
                    $scope.picMessage = undefined;
                }
                else if (data.data.message === "unknown") {
                    $scope.picMessage = "Not LoggedIn";
                    $window.location.reload();
                }
                else {
                    $scope.picMessage = "Upload fail";
                }
            }, function (error) {
                $scope.picMessage = "Upload fail";
            });
        };

    });
