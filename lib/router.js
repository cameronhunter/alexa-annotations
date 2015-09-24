const [intent, launch, sessionEnded] = ["IntentRequest", "LaunchRequest", "SessionEndedRequest"];

export var NotFound = () => Promise.reject("404 Not Found");

export default function Router(request, skill) {
  const { type, intent: { name } = {} } = request;
  return [
    (type == intent && skill[name]),
    (type == intent && skill["intent"] && skill["intent"].bind(skill, name)),
    (type == launch && skill["launch"]),
    (type == sessionEnded && skill["sessionEnded"]),
    (skill["notFound"] || NotFound)
  ].filter(handler => !!handler)[0];
}
