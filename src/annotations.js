const annotation = (predicate, transform = i => i) => (target, name) => {
  target.annotations = target.annotations || {};

  if (Object.keys(target.annotations).indexOf(name) < 0) {
    target.annotations = {
      ...target.annotations,
      [name]: (...args) => {
        return target.annotations[name].predicate(...args) && target[name].call(target, transform(...args), ...args);
      }
    };
  }

  const previousPredicate = (target.annotations[name] && target.annotations[name].predicate) || (() => false);

  target.annotations[name].predicate = (...args) => previousPredicate(...args) || predicate(...args);

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
