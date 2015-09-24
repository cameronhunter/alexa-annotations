export class Skill {
  notFound() {
    return Promise.reject("404 Not Found");
  }
}

export function Handler(skill) {
  function route(request, skill) {
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

  return function handle(event, context) {
    console.log(event, context);
    const { request } = event;
    const { name, handler } = route(request, skill);
    Promise.resolve(handler()).then(response =>
      response ? Promise.resolve(response) : Promise.reject(`Route not correctly handled by ${name}`)
    ).then(response => {
      context.succeed({
        version: "1.0",
        sessionAttributes: {},
        response: { ...response }
      });
    }).catch(error => {
      context.fail(error || "Unknown error");
    });
  }
}
