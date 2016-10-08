/*******************************************************************************
 * This provides multiple ways of declaring an annotation, for example:
 *
 * 1. @Skill
 * 2. @Skill()
 * 3. @Skill({ applicationId: 'my-authorized-application-id' })
 ******************************************************************************/

export default (Handler) => (optionsOrClass = {}) => {
  const isClass = typeof optionsOrClass === 'function';
  const options = isClass ? {} : optionsOrClass;
  const handler = Handler(options);

  return isClass ? handler(optionsOrClass) : handler;
};
