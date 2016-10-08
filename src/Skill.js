import { NotFound, InternalServer } from './ErrorCodes';
import isAuthorized from './Authorization';
import annotation from './annotation/class';

const Skill = (options) => (Skill) => (event, context, callback) => {
  const { session } = event || {};
  const { application, attributes } = session || {};

  return isAuthorized(options, application).then(() => {
    return new Skill(session).route(event) || Promise.reject(NotFound);
  }).then(response => {
    return (typeof response.build === 'function') ? response.build(attributes) : response;
  }).then(response => {
    callback && callback(null, response);
    return response;
  }).catch((error = InternalServer) => {
    callback && callback(error);
    return error;
  }).then(response => {
    if (options.logging !== false) {
      const name = (typeof options.logging === 'string') ? options.logging : 'Skill';
      console.log(`[${name}]`, JSON.stringify({ event, response }));
    }

    return response;
  });
};

export default annotation(Skill);
