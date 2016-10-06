const annotation = (predicate, transform) => (skill, name) => {
  const route = skill.route || (() => false);

  skill.route = function(request) {
    const args = transform ? [transform(request), request] : [request];
    return route.call(this, request) || (predicate(request) && skill[name].apply(this, args));
  };

  return skill;
};

export const Launch = annotation(({ type }) => type === 'LaunchRequest');

export const SessionEnded = annotation(({ type }) => type === 'SessionEndedRequest');

export const Intent = (...names) => annotation(
  ({ type, intent = {} }) => type === 'IntentRequest' && names.indexOf(intent.name) >= 0,
  ({ intent = {} }) => (
    Object.values(intent.slots || {}).reduce((state, { name, value }) => (
      (name && value != null) ? { ...state, [name]: value } : state
    ), {})
  )
);
