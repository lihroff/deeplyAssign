# deeplyAssign
将所有可枚举的属性和符号属性的值从一个或多个源对象深度复制到目标对象。它将返回目标对象。使用TypeScript编写。

## 安装
使用[npm](https://www.npmjs.com/):
```
$ npm i deeplyassign
```

使用[yarn](https://yarnpkg.com/zh-Hans/):
```
$ yarn add deeplyassign
```

## 用法
你可以使用任何模块导入导出方式来使用，这取决于你的环境配置，事例如下：
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

# 行为
- 此与[Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Description)具有相同的行为，并且以递归的方式做深度克隆。
- 没有直接的对象引用并且不会修改中间变量（参考[test](https://github.com/Tommy-White/deeplyAssign/blob/master/__tests__/index.js#L16)）
- 当一个target的一个属性值为函数时，采用引用进行克隆并会保留附加属性(所以对其修改会影响原对象)
- String类型和Symbol类型的属性都会被拷贝(IE浏览器由于不兼容Symbol类型所以自动忽略此类型属性)。

# 许可
MIT © [Tommy White](https://github.com/Tommy-White)