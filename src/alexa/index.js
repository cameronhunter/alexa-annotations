const NotFound = () => Promise.reject("404 Not Found");

function Router(request, skill) {
  const { type, intent: { name } = {} } = request;
  return [
    type == "IntentRequest" && name ? name : null,
    type == "IntentRequest" ? "intent" : null,
    type == "LaunchRequest" ? "launch" : null,
    type == "SessionEndedRequest" ? "sessionEnded" : null,
    "notFound"
  ].filter(name => name != null)
   .map(name => ({ name: name, handler: skill[name] }))
   .filter(({ handler }) => handler != null)[0];
}

function Handler(skill, router = Router) {
  return function handle(event, context) {
    const { request = {} } = event;
    const { intent: { slots = {} } = {} } = request;
    const { handler = NotFound } = router(request, skill);
    const intentData = Object.values(slots).reduce((result, { name, value }) => Object.assign({}, result, { [name]: value }), {});

    Promise.resolve(handler(intentData)).then(response => {
      const data = response ? { version: "1.0", sessionAttributes: {}, response: { ...response } } : undefined;
      context.succeed(data);
    }).catch(error => {
      context.fail(error || "Unknown error");
    });
  }
}

export default {
  Handler: Handler
};
