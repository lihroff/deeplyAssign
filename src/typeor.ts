interface Typeor {
  object: (x: any) => boolean;
  function: (x: any) => boolean;
  [prop: string]: any;
}

const typeor: Typeor = {
  object: x => {
    const toStringIndicator = Object.prototype.toString.call(x) === '[object Object]';
    return x && !toStringIndicator
      ? typeof x === 'object'
      : toStringIndicator;
  },
  function: x => typeof x === 'function',
}

export default typeor;