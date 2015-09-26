require("core-js/fn/object/assign");

var Response = function(state) {
  this.state = Object.assign({ shouldEndSession: false }, state);
};

Response.prototype.say = function(sentence) {
  return new Response(this.state, {
    outputSpeech: { type: "PlainText", text: sentence }
  });
};

Response.prototype.card = function(title, content, type) {
  return new Response(this.state, {
    card: { type: type, title: title, content: content }
  });
};

Response.prototype.reprompt = function(sentence) {
  return new Response(this.state, {
    reprompt: { outputSpeech: { type: "PlainText", text: sentence } }
  });
};

Response.prototype.shouldEndSession = function(shouldEndSession) {
  return new Response(this.state, { shouldEndSession: shouldEndSession });
};

Response.say = new Response().say;
Response.card = new Response().card;
Response.reprompt = new Response().reprompt;
Response.shouldEndSession = new Response().shouldEndSession;

module.exports = Response;
