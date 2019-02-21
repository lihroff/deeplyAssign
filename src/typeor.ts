interface Typeor {
  object: (x: any) => boolean
  array: (x: any) => boolean
  function: (x: any) => boolean
  primitive: (x: any) => boolean
  show: (x: any) => string
  [prop: string]: any
}

const typeor: Typeor = {
  object: x => {
    const toStringIndicator =
      Object.prototype.toString.call(x) === '[object Object]'
    return x && toStringIndicator
  },
  function: x => typeof x === 'function',
  array: x => Array.isArray(x),
  primitive: x => /string|number|boolean|symbol/.test(typeof x) || x == null,
  show: function(x) {
    return this.object(x)
      ? 'object'
      : this.function(x)
      ? 'function'
      : this.array(x)
      ? 'array'
      : x === null
      ? 'null'
      : typeof x
  },
}

export default typeor
