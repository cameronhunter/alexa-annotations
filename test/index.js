var echo = require("../dist");
var handler = echo["echo-skill"];

var event = {
  request: {
    type: "LaunchRequest"
  }
};

var context = {
  succeed: function() {
    console.log.apply(console, arguments);
  },
  fail: function() {
    console.error.apply(console, arguments);
  }
};

handler(event, context);
