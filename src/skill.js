import Router from "./router";
import Response from "./response";

const noop = () => {};
const NotFound = () => Response.say("I'm sorry, I don't know how to do that.");

export default (router = Router) => (Skill) => (event, context) => {
  const { succeed = noop, fail = noop, done = noop } = context || {};

  const { request, session = {}, intent = {} } = event || {};
  const { attributes } = session;
  const { slots = {} } = intent;

  const handler = router(request, new Skill()) || NotFound;
  const intentData = Object.values(slots).reduce((state, { name, value }) => (
    (name && value != null) ? { ...state, [name]: value } : state
  ), {});

  return Promise.resolve(handler(intentData)).then(response => {
    return response && (response instanceof Response) ? response.state : response;
  }).then(response => {
    const data = {
      version: "1.0",
      response: { shouldEndSession: true, ...response },
      ...(attributes && { sessionAttributes: attributes })
    };

    succeed(response && data);
    return data;
  }).catch(error => {
    fail(error || "Unknown error");
    return error;
  });
};