const annotation = (predicate, transform = i => i) => (target, name) => {
  const fn = target[name];
  const annotations = target.annotated || [];
  const previousPredicate = target[name].predicate || (() => false);

  if (annotations.indexOf(name) < 0) {
    target.annotated = [...annotations, name];
    target[name] = (...args) => target[name].predicate(...args) && fn.call(target, transform(...args), ...args);
  }

  target[name].predicate = (...args) => previousPredicate(...args) || predicate(...args);

  return target;
};

export const Launch = annotation(
  ({ type }) => type === 'LaunchRequest'
);

export const SessionEnded = annotation(
  ({ type }) => type === 'SessionEndedRequest',
  ({ reason }) => reason
);

export const Intent = (...names) => annotation(
  ({ type, intent = {} }) => type === 'IntentRequest' && names.indexOf(intent.name) >= 0,
  ({ intent = {} }) => (
    Object.values(intent.slots || {}).reduce((state, { name, value }) => (
      (name && value != null) ? { ...state, [name]: value } : state
    ), {})
  )
);
