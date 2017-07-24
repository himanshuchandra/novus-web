'use strict';

/**
 * @ngdoc function
 * @name novusApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the novusApp
 */
angular.module('novusApp')
  .controller('DashboardCtrl', function ($scope, dashboard, webindex, $window, requrl, $route) {

    $scope.deleteImg = () => {
      alert("hey");
    }

    $scope.dashboard = {
      nxtDate: "",
      nxtDateMessage: "",
      updated:false
    };

    $scope.supremeCasesHide = false;
    $scope.highCasesHide = false;
    $scope.districtCasesHide = false;

    $scope.hideDashboard = false;
    $scope.supremeCaseDetails = true;
    $scope.districtCaseDetails = true;
    $scope.highCaseDetails = true;

    $scope.nxtDatePopup = true;

    $scope.loadFirst = function () {
      // if (webindex.loggedIn != true) {
      //   $window.location.reload();
      //   $window.location.assign(requrl);
      // }
      // else {
      $scope.loadSupreme();
      $scope.loadHigh();
      $scope.loadDistrict();
      // }
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
            if (data.data[i].judgements != undefined && data.data[i].judgements != "" && data.data[i].judgements.length > 5) {
              data.data[i].judgements = data.data[i].judgements.replace(/['"]+/g, '');
              var judgements = data.data[i].judgements;
              var jArray = judgements.split(',');
              data.data[i].jArray = jArray;
            }
            if (data.data[i].petitioners != undefined) {
              data.data[i].pt = data.data[i].petitioners.slice(3, 11);
            }
            if (data.data[i].respondents != undefined) {
              data.data[i].rs = data.data[i].respondents.slice(3, 11);
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

          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].file_path != undefined) {
              data.data[i].file_path = data.data[i].file_path.replace(/['"]+/g, '');
              data.data[i].file_path = $scope.splitString(data.data[i].file_path);
            }
            if (data.data[i].next_date != "" && data.data[i].next_date != null) {
              data.data[i].visDate = data.data[i].next_date.slice(0, 2);
              data.data[i].visYear = data.data[i].next_date.slice(6, 10);
              data.data[i].visMonth = data.data[i].next_date.slice(3, 5);
              data.data[i].visMonth = $scope.month(data.data[i].visMonth);
            }
            if (data.data[i].petitioner != undefined) {
              data.data[i].pt = data.data[i].petitioner.slice(3, 11);
            }
            if (data.data[i].respondent != undefined) {
              data.data[i].rs = data.data[i].respondent.slice(3, 11);
            }
          }

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

    $scope.month = function (month) {
      switch (month) {
        case "01": return "January";
        case "02": return "February";
        case "03": return "March";
        case "04": return "April";
        case "05": return "May";
        case "06": return "June";
        case "07": return "July";
        case "08": return "August";
        case "09": return "September";
        case "10": return "October";
        case "11": return "Novembor";
        case "12": return "December";
        default: return "";
      }
    };

    $scope.loadDistrict = function () {

      var promise = dashboard.loadDistrict();
      promise.then(function (data) {
        console.log("district", data.data);
        if (data.data != undefined) {

          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].petitioner_and_advocate != undefined) {
              data.data[i].pt = data.data[i].petitioner_and_advocate.slice(3, 11);
            }
            if (data.data[i].respondent_and_advocate != undefined) {
              data.data[i].rs = data.data[i].respondent_and_advocate.slice(3, 11);
            }
            Object.keys(data.data[i]).forEach(function (key) {
              if (key.startsWith('final') && data.data[i][key] != undefined) {
                data.data[i][key] = data.data[i][key].replace(/['"]+/g, '');
                data.data[i][key] = $scope.splitString(data.data[i][key]);
              }
            });
            if (data.data[i].status === "waiting") {
              data.data[i].status = "This case will be added shortly!";
            }
            if (data.data[i].next_hearing_date != "" && data.data[i].next_hearing_date != null) {
              data.data[i].visDate = data.data[i].next_hearing_date.slice(0, 2);
              data.data[i].visYear = data.data[i].next_hearing_date.slice(6, 10);
              data.data[i].visMonth = data.data[i].next_hearing_date.slice(3, 5);
              data.data[i].visMonth = $scope.month(data.data[i].visMonth);
            }
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
        if (caseObj.next_date === null) {
          $scope.nxtDatePopup = false;
        }
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

    $scope.setDateDb = function () {
      var sdate=$scope.dashboard.nxtDate.getDate();
      var smonth=$scope.dashboard.nxtDate.getMonth()+1;
      var syear=$scope.dashboard.nxtDate.getFullYear();
      var finaldate = sdate+"/"+smonth+'/'+syear;

      var dateObj = {
        "date": finaldate
      }
      console.log(dateObj.date);
      var promise = dashboard.setDateDb(dateObj);
      promise.then(function (data) {
        $scope.scdetails.next_date=dateObj.finaldate;
        $scope.dashboard.updated=true;
        $scope.dashboard.nxtDateMessage = "";
        $scope.nxtDatePopup=true;
        

      }, function (error) {
        $scope.dashboard.nxtDateMessage = "";
      });
    };

    $scope.setNxtDate = function () {
      if ($scope.dashboard.nxtDate != "" || $scope.dashboard.nxtDate != null) {
        $scope.dashboard.nxtDateMessage = "Updating date..";
        $scope.setDateDb();
      }
      else {
        $scope.dashboard.nxtDateMessage = "Enter valid date!";
      }
    };


    $scope.showCasesButton = function () {
      if($scope.dashboard.updated===true){
        $scope.loadSupreme();
      }
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

    $scope.deleteThis = function (deleteObj) {
      console.log("deleteObj", deleteObj);
      var promise = dashboard.deleteCase(deleteObj);
      promise.then(function (data) {

        if (data.data === 'success') {
          $route.reload();
        }
        else {
          window.alert("Error deleteing case! Please try again later.");
        }
      }, function (error) {
        window.alert("Error deleteing case! Please try again later.");
      });
    };


    $scope.deleteObj = {};
    $scope.deleteCase = function (caseData, type) {
      if (type === 's') {
        $scope.deleteObj = {};
        $scope.deleteObj.diary_number = caseData.diary_number;
        $scope.deleteObj.year = caseData.year;
        $scope.deleteObj.court_type = 's';
        $scope.deleteThis($scope.deleteObj);
      }
      else if (type === 'h') {
        $scope.deleteObj = {};
        $scope.deleteObj.state = caseData.state_name;
        $scope.deleteObj.type = caseData.case_type;
        $scope.deleteObj.number = caseData.case_number;
        $scope.deleteObj.year = caseData.case_year;
        $scope.deleteObj.court_type = 'h';
        $scope.deleteThis($scope.deleteObj);
      }
      else if (type === 'd') {
        $scope.deleteObj = {};
        $scope.deleteObj.state = caseData.state_name;
        $scope.deleteObj.court = caseData.court_complex;
        $scope.deleteObj.type = caseData.case_type_code;
        $scope.deleteObj.number = caseData.case_number;
        $scope.deleteObj.year = caseData.case_year;
        $scope.deleteObj.district = caseData.district_code;
        $scope.deleteObj.court_type = 'd';
        $scope.deleteThis($scope.deleteObj);
      }

    };

    $scope.printDiv = function (div) {
      var divToPrint = document.getElementById(div);
      var newWin = window.open("");
      newWin.document.write(divToPrint.outerHTML);
      newWin.print();
      newWin.close();
    }

  });
