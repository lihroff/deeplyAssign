import deeplyAssign from '../src/index';

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
  });
});

test('deeply assign do not change Intermediate variable', () => {
  const foo = () => {},
    bar = console.log;

  const midlle1 = {
    prop1: 'do',
    prop2: 'not change',
  };
  const midlle2 = {
    prop1: 'Ibid.',
    prop2: foo,
    prop3: true,
  };

  Object.freeze(foo);
  Object.freeze(bar);
  Object.freeze(midlle1);
  Object.freeze(midlle2);

  // If you what to rewrite a TypeError is invorked.
  // midlle2.prop2 = bar

  expect(
    deeplyAssign({}, midlle1, midlle2, { prop1: 'try to change', prop2: bar })
  ).toEqual({
    prop1: 'try to change',
    prop2: bar,
    prop3: true,
  });
});
