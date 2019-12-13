const cleanNullArg = (args: object): object => {
  const notNull = {};
  Object.keys(args).forEach(key => {
    if (args[key] !== null) {
      notNull[key] = args[key];
    }
  });
  return notNull;
}

export default cleanNullArg;