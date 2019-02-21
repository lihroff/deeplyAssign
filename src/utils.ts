// const _curry = (fn: Function) => {
//   const curryN = (n, fn) => (...args: any[]) =>
//     args.length >= n
//       ? fn(...args)
//       : curryN(n-args.length, (...innerArgs) => fn(...args, ...innerArgs))
//   // Rest param do not count in function.length
//   return curryN(fn.length, fn)
// }

const isShadowNested = (obj: Object, ...props: string[]) => {
  const loops = props.length ? props : Object.keys(obj)
  for (let i in loops) {
    if (obj[Object(loops[i])] === obj) return true
  }
  return false
}

export { isShadowNested }
