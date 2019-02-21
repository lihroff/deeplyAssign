import typeor from './typeor'
import { isShadowNested } from './utils'

let stack = 0,
  max = 0

function deeplyAssign(target, ...sources: any[]): object {
  if (target == null) {
    stack = max = 0
    throw new TypeError('Cannot convert undefined or null to object')
  }
  stack++
  const hasOwnProperty = Object.prototype.hasOwnProperty
  const getOwnSymbols = Object.getOwnPropertySymbols
  const isEnumerable = Object.prototype.propertyIsEnumerable

  // creates an object wrapper for Number etc...
  let ret = Object(target) as object

  for (let index = 0; index < sources.length; index++) {
    const nextSource = sources[index]
    if (nextSource != null) {
      // A for...in loop only iterates over enumerable, non-Symbol properties includes prototype.
      for (const prop in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (hasOwnProperty.call(nextSource, prop)) {
          const type = typeor.show(nextSource[prop])
          switch (type) {
            case 'object':
            case 'array':
              if (isShadowNested(nextSource, prop)) {
                // treat as  circular reference
                ret[prop] = nextSource[prop]
              } else if (stack > max || ret[prop] == null) {
                max++
                // use {} or [] for targer to make sure that it not overwrite middle variable
                ret[prop] = deeplyAssign(
                  type === 'object' ? {} : [],
                  ret[prop],
                  nextSource[prop]
                )
              } else {
                deeplyAssign(ret[prop], nextSource[prop])
              }
              break
            case 'function':
              // first use same reference to make sure ret[prop] not null or undefined
              ret[prop] = nextSource[prop]
              // then invork deeply assign
              deeplyAssign(ret[prop], nextSource[prop])
              break
            default:
              ret[prop] = nextSource[prop]
          }
        }
      }
      // Currently Symbol and its stuff is not support by IE
      if (typeor.function(Symbol) || typeor.function(getOwnSymbols)) {
        const symbolProps = getOwnSymbols(nextSource)
        for (let symbolProp of symbolProps) {
          if (isEnumerable.call(nextSource, symbolProp)) {
            ret[symbolProp] = nextSource[symbolProp]
          }
        }
      }
    }
  }
  if (--stack === 0) {
    max = 0
  }
  return ret
}

export default deeplyAssign
