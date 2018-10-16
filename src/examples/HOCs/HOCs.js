export default (id, value) => {
  return id && value ? MyHOCs(id, value) : { id, value };
};

const MyHOCs = (id, value) => {
  return {
    newId: `this is my id: ${id}`,
    newValue: `this is my value: ${value}`
  };
};
