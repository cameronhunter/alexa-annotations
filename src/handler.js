import Router from "./router";
import Response from "./response";

const noop = () => {};
const NotFound = () => Promise.reject("404 Not Found");

export default (skill, router = Router) => (event = {}, context) => {
  const { succeed = noop, fail = noop, done = noop } = context;

  const { request, session = {}, intent = {} } = event;
  const { attributes } = session;
  const { slots } = intent;

  const handler = router(request, skill) || NotFound;
  const intentData = Object.values(slots).reduce((state, { name, value }) => {
    return (name && value != null) ? { ...state, [name]: value } : state;
  }, {});

  return Promise.resolve(handler(intentData)).then(response => {
    return response && (response instanceof Response) ? response.state : response;
  }).then(response => {
    const data = {
      version: "1.0",
      sessionAttributes: attributes,
      response: { shouldEndSession: true, ...response }
    };

    succeed(response && data);
    return data;
  }).catch(error => {
    fail(error || "Unknown error");
    return error;
  });
};
