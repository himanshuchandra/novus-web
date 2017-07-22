'use strict';

describe('Service: addcase', function () {

  // load the service's module
  beforeEach(module('webskeletonApp'));

  // instantiate service
  var addcase;
  beforeEach(inject(function (_addcase_) {
    addcase = _addcase_;
  }));

  it('should do something', function () {
    expect(!!addcase).toBe(true);
  });

});
