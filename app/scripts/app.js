'use strict';

/**
 * @ngdoc overview
 * @name novusApp
 * @description
 * # novusApp
 *
 * Main module of the application.
 */
angular
  .module('novusApp', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'angular-md5',
    'countrySelect',
    'ngFileUpload',
    'mwl.calendar',
    'ui.toggle'

  ])

  .constant("requrl","http://myemunshi.com/app")
  .constant("phpurl","http://myemunshi.com")

  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
      })
      .when('/calendar', {
        templateUrl: 'views/calendar.html',
        controller: 'CalendarCtrl',
        controllerAs: 'calendar'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/emailactivate', {
        templateUrl: 'views/emailactivate.html',
        controller: 'EmailactivateCtrl',
        controllerAs: 'emailactivate'
      })
      .when('/forgotpassword', {
        templateUrl: 'views/forgotpassword.html',
        controller: 'ForgotpasswordCtrl',
        controllerAs: 'forgotpassword'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/addcase', {
        templateUrl: 'views/addcase.html',
        controller: 'AddcaseCtrl',
        controllerAs: 'addcase'
      })
      .when('/causelist', {
        templateUrl: 'views/causelist.html'
      })
      .when('/taskmanager', {
        templateUrl: 'views/taskmanager.html',
        controller: 'TaskmanagerCtrl',
        controllerAs: 'taskmanager'
      })
      .when('/expensemanager', {
        templateUrl: 'views/expensemanager.html'
      })
      .when('/appointments', {
        templateUrl: 'views/appointments.html'
      })
      .when('/revenue', {
        templateUrl: 'views/revenue.html'
      })
      .when('/chat', {
        templateUrl: 'views/chat.html'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.hashPrefix('');
  });

