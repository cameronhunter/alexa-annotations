export default (predicate, transform) => (skill, name) => {
  const route = skill.route || (() => false);

  skill.route = function(event = {}) {
    return route.call(this, event) || (predicate(event) && skill[name].apply(this, getArgs(transform, event)));
  };

  return skill;
};

function getArgs(transform, event) {
  const transformed = transform ? transform(event) : [];
  const args = Array.isArray(transformed) ? transformed : [transformed];
  return [...args, event];
};
