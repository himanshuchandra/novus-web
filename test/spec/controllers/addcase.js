'use strict';

describe('Controller: AddcaseCtrl', function () {

  // load the controller's module
  beforeEach(module('webskeletonApp'));

  var AddcaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddcaseCtrl = $controller('AddcaseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddcaseCtrl.awesomeThings.length).toBe(3);
  });
});
