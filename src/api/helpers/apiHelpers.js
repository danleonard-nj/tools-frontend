const getErrorMessage = (response) => {
  return new Error(
    `Failed to update scene: ${response?.status}: ${
      response.data?.message ?? 'Unhandled server exception'
    }`
  );
};

const sortBy = (obj, prop) => {
  const sortFunc = (x, y) => (x[prop] > y[prop] ? 1 : -1);
  obj.sort(sortFunc);
};

const replace = (selector, items, replacement) => {
  return items.map((item) => (selector(item) ? replacement : item));
};

export { getErrorMessage, sortBy, replace };
