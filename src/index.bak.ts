function isFnOrObject(x){
  const toStringIndicator =  Object.prototype.toString.call(x) === '[object Object]';
  return typeof x === 'function' 
    ? true 
    : x && !toStringIndicator 
      ? typeof x === 'object'
      : toStringIndicator;
}

function deeplyAssign(target, ...sources) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const getOwnSymbols = Object.getOwnPropertySymbols;
  const isEnumerable = Object.prototype.propertyIsEnumerable;

  // creates an object wrapper for Number etc...
  let ret = Object(target);

  for (let index = 0; index < sources.length; index++) {
    const nextSource = sources[index]
    if (nextSource != null) {
      // A for...in loop only iterates over enumerable, non-Symbol properties includes prototype.
      for(const prop in nextSource){
        // Avoid bugs when hasOwnProperty is shadowed
        if (hasOwnProperty.call(nextSource, prop)) {
          if (isFnOrObject(nextSource[prop])) {
            ret[prop] = deeplyAssign({}, ret[prop], nextSource[prop])
          } else {
            ret[prop] = nextSource[prop];
          }
        }
      }
      // Currently Symbol and its stuff is not support by IE
      if(typeof Symbol === 'function' || typeof getOwnSymbols === 'function'){
        const symbolProps = getOwnSymbols(nextSource)
        for (let symbolProp of symbolProps) {
          if (isEnumerable.call(nextSource, symbolProp)) {
            ret[symbolProp] = nextSource[symbolProp];
          }
        }
      }
    }
  } 

  return ret;
}