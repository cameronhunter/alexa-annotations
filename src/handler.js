import Router from "./router";
import Response from "./response";

const noop = () => {};
const DefaultContext = { succeed: noop, fail: noop, done: noop };
const NotFound = () => Promise.reject("404 Not Found");

export default (skill, router = Router) => (event = {}, context = DefaultContext) => {
  const request = event.request || {};
  const attributes = (event.session || {}).attributes || {};
  const slots = (request.intent || {}).slots || {};

  const handler = router(request, skill) || NotFound;
  const intentData = Object.values(slots).reduce(function(result, pair) {
    const obj = {};
    if (pair.name && pair.value != null) {
      obj[pair.name] = pair.value;
    }
    return { ...result, ...obj };
  }, {});

  return Promise.resolve(handler(intentData)).then(function(response) {
    return response && (response instanceof Response) ? response.state : response;
  }).then(response => {
    const data = !response ? undefined : {
      version: "1.0",
      sessionAttributes: attributes,
      response: Object.assign({}, { shouldEndSession: true }, response)
    };
    context && context.succeed && context.succeed(data);
    return data;
  }).catch(error => {
    context && context.fail && context.fail(error || "Unknown error");
    return error;
  });
};
