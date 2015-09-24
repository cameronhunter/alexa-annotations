import Router, { NotFound } from "./router";

export default function Handler(skill, router = Router) {
  return function handle(event, context) {
    const { request = {} } = event;
    const { intent: { slots = {} } = {} } = request;
    const { handler = NotFound } = router(request, skill);
    const intentData = Object.values(slots).reduce((result, { name, value }) => Object.assign({}, result, { [name]: value }), {});

    Promise.resolve(handler(intentData)).then(response => {
      const data = response ? { version: "1.0", sessionAttributes: {}, response: { shouldEndSession: true, ...response } } : undefined;
      context.succeed(data);
    }).catch(error => {
      context.fail(error || "Unknown error");
    });
  }
}
