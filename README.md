# deeplyAssign
> A deeply copy the values of all enumerable own properties and symbol properties from one or more source objects to a target object. It will return the target object. Written in TypeScript.


## install
Install with [npm](https://www.npmjs.com/):
```
$ npm i deeplyassign
```

## Usage
> You can use any module sys to use determined by your environment, such as below:

```js
import deeplyAssign from '../src/index';

  const source1 = { 
    info: { 
      author: 'Tommy'
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
  - This does same behavior as [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Description), and run in recursive for deep clone.
  - There is no direct reference to the object type and the intermediate variable is not modified(see test).
  - When some props value are method, the reference is taken and the additional props are retained.
  - String and Symbol properties are copied.

## License
MIT © [Tommy White](https://github.com/Tommy-White)
