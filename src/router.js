export default (request = {}, skill) => {
  const { type, reason, intent = {} } = request;
  const { name } = intent;
  const [route] = [
    (type == "LaunchRequest" && skill["launch"] && skill["launch"].bind(skill)),
    (type == "IntentRequest" && skill["intent"] && skill["intent"].bind(skill, name)),
    (type == "SessionEndedRequest" && skill["sessionEnded"] && skill["sessionEnded"].bind(skill, reason)),
    (type == "IntentRequest" && skill[name] && skill[name].bind(skill))
  ].filter(handler => (
    !!handler
  ));

  return route;
};
