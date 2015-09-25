import Router, { NotFound } from "./router";
import { Response } from "./response";
import ObjectValues from "object.values";

const DefaultContext = {
  success() {},
  fail() {},
  done() {}
};

export default function Handler(skill, router = Router) {
  return function handle(event = {}, context = DefaultContext) {
    const { request = {}, session: { attributes = {} } = {} } = event;
    const { intent: { slots = {} } = {} } = request;
    const handler = router(request, skill) || NotFound;
    const intentData = ObjectValues(slots).reduce((result, { name, value }) => Object.assign({}, result, { [name]: value }), {});

    Promise.resolve(handler(intentData)).then(response => {
      return response && (response instanceof Response) ? response.state : response;
    }).then(response => {
      const data = !response ? undefined : {
        version: "1.0",
        sessionAttributes: attributes,
        response: {
          shouldEndSession: true,
          ...response
        }
      };
      context.succeed(data);
    }).catch(error => {
      context.fail(error || "Unknown error");
    });
  }
}
