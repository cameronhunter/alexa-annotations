import Response from './response';

const NotFound = Response.say('I\'m sorry, I don\'t know how to do that.');

export default Skill => (event, context) => {
  const { succeed, fail } = context || {};
  const { request, session } = event || {};
  const { attributes } = session || {};

  const skill = new Skill(attributes);
  const [result] = Object.values(skill.annotations).map(fn => fn(request)).filter(result => !!result);

  return Promise.resolve(result || NotFound).then(response => (
    response instanceof Response ? response.build(attributes) : response
  )).then(response => {
    succeed && succeed(response);
    return response;
  }).catch((error = 'Unknown error') => {
    fail && fail(error);
    return error;
  });
};
