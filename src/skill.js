import Response from './response';

const noop = () => {};
const NotFound = Response.say('I\'m sorry, I don\'t know how to do that.');

export default Skill => (event, context) => {
  const { succeed = noop, fail = noop } = context || {};

  const { request, session } = event || {};
  const { attributes } = session || {};

  const skill = new Skill(session);
  const [result] = skill.annotated.map(fn => skill[fn](request)).filter(result => !!result);

  return Promise.resolve(result || NotFound).then(response => (
    response && response instanceof Response ? response.state : response
  )).then(response => {
    const data = {
      version: '1.0',
      response: { shouldEndSession: true, ...response },
      ...(attributes && { sessionAttributes: attributes })
    };

    succeed(response && data);
    return data;
  }).catch(error => {
    fail(error || 'Unknown error');
    return error;
  });
};
