export default (predicate, transform) => (skill, name) => {
  const route = skill.route || (() => false);

  skill.route = function(request) {
    const args = transform ? [transform(request), request] : [request];
    return route.call(this, request) || (predicate(request) && skill[name].apply(this, args));
  };

  return skill;
};
