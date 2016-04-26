import { Unauthorized, NotFound, InternalServer } from './error-codes';

const isAuthorized = (expected = {}, actual = {}) => new Promise((resolve, reject) => {
  const isOK = !expected.applicationId || expected.applicationId === actual.applicationId;
  return isOK ? resolve() : reject(Unauthorized);
});

const SkillAnnotation = (options) => (Skill) => (event, context, callback) => {
  const { request, session } = event || {};
  const { application, attributes } = session || {};

  return isAuthorized(options, application).then(() => {
    return new Skill(session).route(request) || Promise.reject(NotFound);
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
      console.log(`[${name}]`, JSON.stringify({ request, response }));
    }

    return response;
  });
};

/*******************************************************************************
 * This provides multiple ways of using the @Skill annotation:
 *
 * 1. @Skill
 * 2. @Skill()
 * 3. @Skill({ applicationId: 'my-authorized-application-id' })
 ******************************************************************************/

export default (optionsOrSkill = {}) => {
  const isSkill = typeof optionsOrSkill === 'function';
  const options = isSkill ? {} : optionsOrSkill;
  const skill = isSkill && optionsOrSkill;

  return isSkill ? SkillAnnotation(options)(skill) : SkillAnnotation(options);
};
