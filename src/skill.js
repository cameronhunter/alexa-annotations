import { Unauthorized, NotFound, InternalServer } from './error-codes';

const isAuthorized = (expected = {}, actual = {}) => {
  const isOK = !expected.applicationId || expected.applicationId === actual.applicationId;
  return isOK ? Promise.resolve() : Promise.reject(Unauthorized);
};

const SkillAnnotation = (options) => (Skill) => (event, context) => {
  const { succeed, fail } = context || {};
  const { request, session } = event || {};
  const { application, attributes } = session || {};

  return isAuthorized(options, application).then(() => {
    const skill = new Skill(attributes);
    return (skill.route && skill.route(request)) || Promise.reject(NotFound);
  }).then(response => {
    return (response.build && typeof response.build === 'function') ? response.build(attributes) : response;
  }).then(response => {
    succeed && succeed(response);
    return response;
  }).catch((error = InternalServer) => {
    fail && fail(error);
    return error;
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
