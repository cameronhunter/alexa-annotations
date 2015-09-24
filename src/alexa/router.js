const [intent, launch, sessionEnded] = ["IntentRequest", "LaunchRequest", "SessionEndedRequest"];

export default function Router(request, skill) {
  const { type, intent: { name } = {} } = request;
  return [
    type == intent && name ? name : null,
    type == intent ? "intent" : null,
    type == launch ? "launch" : null,
    type == sessionEnded ? "sessionEnded" : null,
    "notFound"
  ].filter(name => name != null)
   .map(name => ({ name: name, handler: skill[name] }))
   .filter(({ handler }) => handler != null)[0];
}

export var NotFound = () => Promise.reject("404 Not Found");
