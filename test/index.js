/* global describe, it, before, after */
(function () {
  'use strict';

  var assert = require('assert');

  // Test HTTP server
  var http = require('http');
  var server = http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type' : 'text/html' });
    response.end('<div id="foo">Hello World!</div>\n');
  });
  server.listen(8000);

  describe('autonomous-webdriver', function () {

    var aw = require('../src/index');
    var webdriver = aw.webdriver;

    it('should start and stop a server', function () {
      var server = aw.newServer();
      return server.start().then(function () {
        var driver = server.newDriver();
        driver.get('http://localhost:8000');
        return driver.isElementPresent(webdriver.By.id('foo')).then(function (present) {
          assert.ok(present);
        });
      }).then(server.stop, server.stop);
    });

    describe('manual readme example', function () {
      it('should execute example', function () {
        var server = aw.newServer();
        return server.start().then(function () {
          var driver = server.newDriver();
          driver.get('http://www.google.com');
          var searchBox = driver.findElement(webdriver.By.name('q'));
          searchBox.sendKeys('webdriver');
          return searchBox.getAttribute('value').then(function(value) {
            assert.equal(value, 'webdriver');
          });
        }).then(server.stop, server.stop);
      });
    });

    describe('mocha readme example', function () {
      var server = aw.newServer();

      before(server.start);
      after(server.stop);

      it('should execute example', function () {
        var driver = server.newDriver();
        driver.get('http://www.google.com');
        var searchBox = driver.findElement(webdriver.By.name('q'));
        searchBox.sendKeys('webdriver');
        return searchBox.getAttribute('value').then(function(value) {
          assert.equal(value, 'webdriver');
        });
      });
    });
  });
})();
