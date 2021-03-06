import deeplyAssign from '../src/index'

test('deeply assign properties of source to the target', () => {
  expect(
    deeplyAssign(
      { info: { author: 'Tommy' }, finish: false, other: 'follow' },
      { info: { author: 'moZLeo', sex: 'male' }, finish: true }
    )
  ).toEqual({
    info: { author: 'moZLeo', sex: 'male' },
    finish: true,
    other: 'follow',
  })
})

test('deeply assign do not change Intermediate variable', () => {
  const foo = () => {},
    bar = console.log

  const middle1 = {
    prop1: 'do',
    prop2: 'not change',
  }
  const middle2 = {
    prop1: 'Ibid.',
    prop2: foo,
    prop3: true,
  }

  Object.freeze(foo)
  Object.freeze(bar)
  Object.freeze(middle1)
  Object.freeze(middle2)

  // If you what to rewrite a TypeError is invorked.
  // middle2.prop2 = bar

  expect(
    deeplyAssign({}, middle1, middle2, { prop1: 'try to change', prop2: bar })
  ).toEqual({
    prop1: 'try to change',
    prop2: bar,
    prop3: true,
  })
})

test('deeply assign array', () => {
  expect(
    deeplyAssign(
      { test: 'array' },
      [0, 1, 2, 3],
      [3, 2, 1, { overwrite: true }, { sub: ['abcd'] }]
    )
  ).toEqual({
    0: 3,
    1: 2,
    2: 1,
    3: { overwrite: true },
    4: { sub: ['abcd'] },
    test: 'array',
  })
})

test('deeply assign to null', () => {
  expect(() => deeplyAssign(null, {})).toThrowError(TypeError)
})

test('Provide non-iterable and non-enumerable as source', () => {
  expect(
    deeplyAssign({ flag: 'non-iterable' }, null, undefined, function fn() {
      return 'this a function'
    })
  ).toEqual({ flag: 'non-iterable' })
})

test(' circular reference.', () => {
  const loop1 = {},
    arr = [],
    loop2 = { arr }
  loop1.nest = loop1
  loop2.arr[0] = arr

  Object.freeze(loop1)
  Object.freeze(loop2)

  expect(deeplyAssign({}, { loop1 }, { loop2 })).toEqual({ loop1, loop2 })
})

// know issue: deep circular reference error.
// test('Deep  circular reference.', () => {
//   const loop = { deep: {} }
//   loop.deep.nest = loop
//   expect(deeplyAssign({}, { loop })).toEqual({ loop })
// })

// test('Deep  circular reference.', () => {
//   const bar = { }
//   const foo = { loop: bar }
//   bar.loop = foo
//   expect(deeplyAssign({}, bar, foo)).toEqual({ foo })
// })
