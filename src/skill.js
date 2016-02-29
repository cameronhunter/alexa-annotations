import { say } from 'alexa-response';

const NotFound = say('I\'m sorry, I don\'t know how to do that.');

export default Skill => (event, context) => {
  const { succeed, fail } = context || {};
  const { request, session } = event || {};
  const { attributes } = session || {};

  const skill = new Skill(attributes);
  const result = (skill.route && skill.route(request)) || NotFound;

  return Promise.resolve(result).then(response => (
    (response.build && typeof response.build === 'function') ? response.build(attributes) : response
  )).then(response => {
    succeed && succeed(response);
    return response;
  }).catch((error = 'Unknown error') => {
    fail && fail(error);
    return error;
  });
};
