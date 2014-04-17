# Autonomous WebDriver

A way to write [selenium](http://docs.seleniumhq.org/)/[WebDriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs) tests without having to worry about starting a server, it runs against [phantomjs](http://phantomjs.org/) by default.

Next feature: being able to run against an existing server with other browsers than phantomjs by setting environment parameters rather than touching the code.

## Usage

Add `autonomous-webdriver` to your development dependencies with `npm install --save-dev autonomous-webdriver`.

In your tests, start and stop the server:

```js
// get the module
var aw = require('autonomous-webdriver');

// store WebDriverJs
var webdriver = aw.webdriver;

// create a new server and start it
var server = aw.newServer();
return server.start().then(function () {

  // get a fresh driver
  var driver = server.newDriver();

  // execute your test
  driver.get('http://www.google.com');
  var searchBox = driver.findElement(webdriver.By.name('q'));
  searchBox.sendKeys('webdriver');
  // do not forget to return a promise for the server to be shutdown only after the test
  return searchBox.getAttribute('value').then(function(value) {
    assert.equal(value, 'webdriver');
  });

// shutdown the server, ensure it is always called
}).then(server.stop, server.stop);
```

Using [Mocha 1.18.0+](http://visionmedia.github.io/mocha/), one can use `before`/`after` and leverage promises:

```js
var aw = require('autonomous-webdriver');
var server = aw.newServer();
var webdriver = aw.webdriver;

before(server.start);
after(server.stop);

describe('my stuff', function() {
  it('does something', function () {
    var driver = server.newDriver();
    driver.get('http://www.google.com');
    var searchBox = driver.findElement(webdriver.By.name('q'));
    searchBox.sendKeys('webdriver');
    return searchBox.getAttribute('value').then(function(value) {
      assert.equal(value, 'webdriver');
    });
  });
});
```

## Build

[![Build Status](https://travis-ci.org/mathbruyen/autonomous-webdriver.png?branch=master)](https://travis-ci.org/mathbruyen/autonomous-webdriver)

Initial setup is done using `npm install` and builds are launched with `npm test`

## License

MIT
