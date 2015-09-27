require("core-js/es6/promise");
require("core-js/fn/object/assign");
require("core-js/fn/object/values");

var Router = require("./router");
var Response = require("./response");

var noop = function() {};
var DefaultContext = { succeed: noop, fail: noop, done: noop };
var NotFound = function() { return Promise.reject("404 Not Found"); };

module.exports = function Handler(skill, router) {
  var router = router || Router;

  return function handle(event, context) {
    var context = context || DefaultContext;
    var event = event || {};
    var request = event.request || {};
    var attributes = (event.session || {}).attributes || {};
    var slots = (request.intent || {}).slots || {};

    var handler = router(request, skill) || NotFound;
    var intentData = Object.values(slots).reduce(function(result, pair) {
      var obj = {};
      if (pair.name && pair.value != null) {
        obj[pair.name] = pair.value;
      }
      return Object.assign({}, result, obj);
    }, {});

    return Promise.resolve(handler(intentData)).then(function(response) {
      return response && (response instanceof Response) ? response.state : response;
    }).then(function(response) {
      var data = !response ? undefined : {
        version: "1.0",
        sessionAttributes: attributes,
        response: Object.assign({}, { shouldEndSession: true }, response)
      };
      context && context.succeed && context.succeed(data);
      return data;
    }).catch(function(error) {
      context && context.fail && context.fail(error || "Unknown error");
      return error;
    });
  }
};
