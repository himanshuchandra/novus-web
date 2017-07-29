'use strict';

/**
 * @ngdoc function
 * @name novusApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the novusApp
 */
angular.module('novusApp')
  .controller('DashboardCtrl', function ($scope, dashboard, webindex, $window, requrl, $route, moment, calendarConfig) {

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
      $scope.loadSupreme();
      $scope.loadHigh();
      $scope.loadDistrict();
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
              data.data[i].pt = data.data[i].petitioners.slice(0, 25);
            }
            if (data.data[i].respondents != undefined) {
              data.data[i].rs = data.data[i].respondents.slice(0, 25);
            }
            if (data.data[i].next_date != "" && data.data[i].next_date != null) {
              data.data[i].visDate = data.data[i].next_date.slice(0, 2);
              data.data[i].visYear = data.data[i].next_date.slice(6, 10);
              data.data[i].visMonth = data.data[i].next_date.slice(3, 5);
              data.data[i].visMonth = $scope.month(data.data[i].visMonth);
            }
            else{
              data.data[i].visDate = "next";
              data.data[i].visYear = "date";
              data.data[i].visMonth = "Enter";
            }
            var event ={
              title : data.data[i].petitioners+"VS"+data.data[i].respondents,
              color : calendarConfig.important,
              startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
              endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            }
            webindex.events.push(event);
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
              data.data[i].pt = data.data[i].petitioner.slice(0, 25);
            }
            if (data.data[i].respondent != undefined) {
              data.data[i].rs = data.data[i].respondent.slice(0, 25);
            }
            var event ={
              title : data.data[i].petitioner+"VS"+data.data[i].respondent,
              color : calendarConfig.warning,
              startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
              endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            }
            webindex.events.push(event);
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
              data.data[i].pt = data.data[i].petitioner_and_advocate.slice(0, 25);
            }
            if (data.data[i].respondent_and_advocate != undefined) {
              data.data[i].rs = data.data[i].respondent_and_advocate.slice(0, 25);
            }
            Object.keys(data.data[i]).forEach(function (key) {
              if (key.startsWith('final') && data.data[i][key] != undefined) {
                data.data[i][key] = data.data[i][key].replace(/['"]+/g, '');
                if(key!="final_interim_order_file_list"){
                  data.data[i][key] = $scope.splitString(data.data[i][key]);
                }
                else if(data.data[i][key]!=undefined){
                  data.data[i][key] = data.data[i][key].split('~');
                }
              }
            });
            if (data.data[i].status === "waiting") {
                data.data[i].status = "This case will be added shortly!";
            }
            else if(data.data[i].status === "success"){
                data.data[i].status = "";
            }
            if (data.data[i].final_hearing_date_list!=undefined){
                data.data[i].lastHearingDate=data.data[i].final_hearing_date_list[data.data[i].final_hearing_date_list.length-1];
            }
            if (data.data[i].lastHearingDate != "" && data.data[i].lastHearingDate != null) {
              data.data[i].visDate = data.data[i].lastHearingDate.slice(0, 2);
              data.data[i].visYear = data.data[i].lastHearingDate.slice(6, 10);
              data.data[i].visMonth = data.data[i].lastHearingDate.slice(3, 5);
              data.data[i].visMonth = $scope.month(data.data[i].visMonth);
            }
            else{
              data.data[i].visDate = " ";
              data.data[i].visYear = " ";
              data.data[i].visMonth = " ";
            }
            var event ={
              title : data.data[i].petitioner_and_advocate+"VS"+data.data[i].respondent_and_advocate,
              color : calendarConfig.info,
              startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
              endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            }
            webindex.events.push(event);
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
    $scope.sdcase={};

    $scope.showDetailsButton = function (caseObj, type) {
      $scope.hideDashboard = true;
      if (type === 's') {
        if (caseObj.next_date === null) {
          $scope.nxtDatePopup = false;
          $scope.sdcase=caseObj;
        }
        $scope.scdetails = caseObj;
        $scope.supremeCaseDetails = false;
      }
      else if (type === 'h') {
        $scope.hcdetails = caseObj;
        $scope.highCaseDetails = false;
      }
      else if (type === 'd') {
        if(caseObj.police_station===undefined || caseObj.police_station==="" || caseObj.police_station==="None"){
          $scope.firHide=true;
        }
        else{
          $scope.firHide=false;
        }
        if(caseObj.final_case_transfer_transfer_date_list[0]===undefined || caseObj.final_case_transfer_transfer_date_list[0]===""){
          $scope.caseTransferHide=true;
        }
        else{
          $scope.caseTransferHide=false;
        }
        $scope.dcdetails = caseObj;
        $scope.districtCaseDetails = false;
      }

    };

    $scope.setDateDb = function () {
      var sdate=$scope.dashboard.nxtDate.getDate();
      var smonth=$scope.dashboard.nxtDate.getMonth()+1;
      sdate=parseInt(sdate);
      if(sdate<10){
        sdate='0'+sdate;
      }
      smonth=parseInt(smonth);
      if(smonth<10){
        smonth='0'+smonth;
      }
      var syear=$scope.dashboard.nxtDate.getFullYear();
      var finaldate = sdate+"/"+smonth+'/'+syear;

      var dateObj = {
        "date": finaldate,
        "diary_number": $scope.sdcase.diary_number,
        "year": $scope.sdcase.year
      }
      console.log(dateObj.date);
      var promise = dashboard.setDateDb(dateObj);
      promise.then(function (data) {
        $scope.scdetails.next_date=dateObj.date;
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
      $scope.tribunalCasesHide = true; //do false when tribunal part is ready
    };

    $scope.showAllCases();

    $scope.showSupremeCases = function () {
      $scope.supremeCasesHide = false;
      $scope.highCasesHide = true;
      $scope.districtCasesHide = true;
      $scope.tribunalCasesHide = true;
    };

    $scope.showHighCases = function () {
      $scope.supremeCasesHide = true;
      $scope.highCasesHide = false;
      $scope.districtCasesHide = true;
      $scope.tribunalCasesHide = true;
    };

    $scope.showDistrictCases = function () {
      $scope.supremeCasesHide = true;
      $scope.highCasesHide = true;
      $scope.districtCasesHide = false;
      $scope.tribunalCasesHide = true;
    };

    $scope.showTribunalCases = function () {
      $scope.supremeCasesHide = true;
      $scope.highCasesHide = true;
      $scope.districtCasesHide = true;
      $scope.tribunalCasesHide = false;
    };

    ////////////Deletion of cases logic

    $scope.deleteThis = function (deleteObj,cindex) {
      console.log("deleteObj", deleteObj);
      var promise = dashboard.deleteCase(deleteObj);
      promise.then(function (data) {

        if (data.data === 'success') {
          if(deleteObj.court_type==='s'){
            $scope.Scases.splice(cindex,1);
          }
          else if(deleteObj.court_type==='h'){
            $scope.Hcases.splice(cindex,1);
          }
          else if(deleteObj.court_type==='d'){
            $scope.Dcases.splice(cindex,1);
          }
          // $route.reload();
        }
        else {
          window.alert("Error deleteing case! Please try again later.");
        }
      }, function (error) {
        window.alert("Error deleteing case! Please try again later.");
      });
    };


    $scope.deleteObj = {};
    $scope.deleteCase = function (caseData, type ,cindex ) {
      if (type === 's') {
        $scope.deleteObj = {};
        $scope.deleteObj.diary_number = caseData.diary_number;
        $scope.deleteObj.year = caseData.year;
        $scope.deleteObj.court_type = 's';
        $scope.deleteThis($scope.deleteObj,cindex);
      }
      else if (type === 'h') {
        $scope.deleteObj = {};
        $scope.deleteObj.state = caseData.state_name;
        $scope.deleteObj.type = caseData.case_type;
        $scope.deleteObj.number = caseData.case_number;
        $scope.deleteObj.year = caseData.case_year;
        $scope.deleteObj.court_type = 'h';
        $scope.deleteThis($scope.deleteObj,cindex);
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
        $scope.deleteThis($scope.deleteObj,cindex);
      }

    };

    //////////Printing of case details logic
    $scope.printDiv = function (div) {
      var divToPrint = document.getElementById(div);
      var newWin = window.open("");
      newWin.document.write(divToPrint.outerHTML);
      newWin.print();
      newWin.close();
    }

  });
