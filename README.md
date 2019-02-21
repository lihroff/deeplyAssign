# deeplyAssign
> A deeply copy the values of all enumerable own properties and symbol properties from one or more source objects to a target object. It will return the target object. Written in TypeScript.

## Translate ✏️
- [中文Chinese](https://github.com/Tommy-White/deeplyAssign/blob/master/README_ZH-CH.md)

## install
Install with [npm](https://www.npmjs.com/):
```
$ npm i deeplyassign
```

Install with [yarn](https://yarnpkg.com/en/):
```
$ yarn add deeplyassign
```

## Usage
> You can use any module sys to use determined by your environment, such as below:

```js
//const deeplyAssign = require("deeplyassign").default
import deeplyAssign from 'deeplyassign';

  const source1 = { 
    info: { 
      author: 'Tommy',
      from: 'China' 
    }, 
    finish: false,
    other: 'follow' 
  }

  const source2 = { 
    info: { 
      author: 'moZLeo', 
      sex: 'male' 
    }, 
    finish: true,
    log: console.log
  }

  console.log(deeplyAssign({}, source1, source2))

  // {
  //   info: { author: 'moZLeo', from: 'China', sex: 'male' },
  //   finish: true,
  //   other: 'follow',
  //   log: console.log
  // }
```

## Behavior
  - This does basically same behavior as [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Description), and run in recursive for deep clone.
    - difference: The value type of the attribute of the source object is used when the corresponding attribute value type of target and source is inconsistent. This means that the value of the original target attribute will be discarded or overridden. Such as:
    ```js
    const target = { prop: { org: 'xxx' } };  // type of target.prop => 'object'
    const source = { prop: [ 0, 1 ] };        // type of source.prop => 'array'

    console.log(target, source)               // { prop: [ 0, 1 ] }
    ```

  - There is no direct reference to the object type and the intermediate variable is not modified(see [test](https://github.com/Tommy-White/deeplyAssign/blob/master/__tests__/index.js#L16)).
    - Compatible with one layer of circular reference objects.
  - When a property value of a target is a function, cloning with a reference retains the additional property (so modifying it affects the original object). 
  - String and Symbol properties are copied(IE browser automatically ignores this type attribute because it is not compatible with the Symbol type.).

## License
MIT © [Tommy White](https://github.com/Tommy-White)
