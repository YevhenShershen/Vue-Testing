const createStubbedMethods = (methods = {}) => {
  if (!methods) {
    return {};
  }
  return Object.keys(methods).reduce(
    (acc, key) =>
      Object.assign(acc, {
        [key]: () => {},
      }),
    {}
  );
};

export function stubComponent(Component, options = {}) {
  return {
    props: Component.props,
    model: Component.model,
    methods: createStubbedMethods(Component.methods),
    //Do not render any slots/scoped slots except deafult
    //This differs from VTU behavior which renders all slots
    template: "<div><slot></slot></div>",
    $_vueTestUtils_original: Component,
    ...options,
  };
}
