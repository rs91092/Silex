var assert = require('assert')
, expect = require('chai').expect
, helper = require('../helper.js');

// store the driver and webdriver instances
// created by the helper.js methods
var driver, webdriver;

// check command line input params
if (!helper.checkParams()){
  console.error('You are supposed to call grunt with param \'-firefox\', \'-chrome\' or \'-phantomjs\'. Canceling tests.');
  return;
}

describe('Silex config', function() {

before(function(done) {
  this.timeout(60000);
  helper.startSelenium(function (helperDriver, helperWebdriver) {
    driver = helperDriver;
    webdriver = helperWebdriver;
    // open silex
    driver.get('http://localhost:6805/silex/').then(function () {
      done();
    });
  });
});
it('should be able to load', function() {
  // wait for silex to be loaded
  driver.wait(function() {
    return driver.findElement(webdriver.By.className('background')).isDisplayed();
  }, 2000);
});

var config;

it('should be valid', function(done) {
  driver.executeScript('return silex.Config.debug;').then(function (res){
    config = res;
    if(config){
      done();
    }
    else{
      done('could not retrieve config from Silex');
    }
  });
});
it('should not be in debug mode', function(done) {
  if (config.debugMode === true){
    done('silex is in debug mode');
  }
  else{
    done();
  }
});

after(function(done) {
  this.timeout(60000);
  // shut down selenium
  helper.stopSelenium(function () {
    done();
  });
});

});
