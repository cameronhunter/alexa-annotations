const annotation = (predicate, transform = i => i) => (target, name) => {
  const previous = target.route || (() => false);

  target.route = (...args) => {
    return previous(...args) || (predicate(...args) && target[name].call(target, transform(...args), ...args));
  };

  return target;
};

export const Launch = annotation(
  ({ type }) => type === 'LaunchRequest'
);

export const SessionEnded = annotation(
  ({ type }) => type === 'SessionEndedRequest'
);

export const Intent = (...names) => annotation(
  ({ type, intent = {} }) => type === 'IntentRequest' && names.indexOf(intent.name) >= 0,
  ({ intent = {} }) => (
    Object.values(intent.slots || {}).reduce((state, { name, value }) => (
      (name && value != null) ? { ...state, [name]: value } : state
    ), {})
  )
);
