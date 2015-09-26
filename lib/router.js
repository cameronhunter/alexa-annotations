module.exports = function Router(request, skill) {
  var request = request || {};
  var type = request.type;
  var reason = request.reason;
  var name = request.intent && request.intent.name;
  return [
    (type == "IntentRequest" && skill[name]),
    (type == "IntentRequest" && skill["intent"] && skill["intent"].bind(skill, name)),
    (type == "LaunchRequest" && skill["launch"]),
    (type == "SessionEndedRequest" && skill["sessionEnded"] && skill["sessionEnded"].bind(skill, reason)),
    skill["notFound"]
  ].filter(function(handler) {
    return !!handler;
  })[0];
};
