export default (request = {}, skill) => {
  const { type, reason, intent = {} } = request;
  const { name } = intent;
  return [
    (type == "IntentRequest" && skill[name]),
    (type == "IntentRequest" && skill["intent"] && skill["intent"].bind(skill, name)),
    (type == "LaunchRequest" && skill["launch"]),
    (type == "SessionEndedRequest" && skill["sessionEnded"] && skill["sessionEnded"].bind(skill, reason))
  ].filter(handler => {
    return !!handler;
  })[0];
};
