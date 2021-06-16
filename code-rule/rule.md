# 规范

>本文档记录开发中一些规范

## 编辑规范

- .editorconfig: 告诉编辑器该项目的代码规范。

在团队开发中可能涉及的一个问题是，不同的同学可能使用的开发工具和开发习惯并不相同，
有的使用WebStorm，有的使用Visual Studio Code。
所以有可能在你的编辑器中习惯缩进使用的是2个空格，在他的编辑器中缩进使用的是4个空格。
该配置文件就是用于存储统一的样式规范，告诉编辑器统一使用两个空格，不允许空字符串结尾等等。
具体请参考
[editorconfig.org](http://editorconfig.org/)
[利用EditorConfig定义代码格式,统一代码风格](https://relign.github.io/%E5%89%8D%E7%AB%AF%E5%B7%A5%E5%85%B7/editor-config/)

### 代码规范

- .eslintrc.js: 这个很好理解，eslint工具的配置文件。

eslint是一款专业对js语法和格式进行检测的工具，大部分的编辑器应该都进行了集成，或者当作插件进行安装。该配置文件告诉eslint哪些文件可以忽略，哪些规则可以忽略，哪些文件适配哪些规则等等。具体请参考:
[eslint](https://eslint.org/docs/user-guide/configuring)
[react的eslint规则配置](https://github.com/ecomfe/spec/issues/38)

- .stylelintrc.js:

同上，stylelint是对样式文件进行语法规范检测的工具，该配置文件则可以对检测规则进行细节配置。具体规则请参考: 
[stylelint](https://stylelint.io/user-guide/configuration/)

- .flowconfig:

flow是Facebook推出一款用于对JavaScript语法进行类型检测的开源工具（有TypeScript的意思）。该文件就是该工具的配置文件，具体可以前往
[flow](https://flow.org/en/docs/config/)

### 注释规范

- TODO 在该注释处有功能代码待编写，待实现的功能在说明中会简略说明
- FIXME 在该注释处代码需要修正，甚至代码是错误的，不能工作，需要修复，如何修正会在说明中简略说明
- XXX 在该注释处代码虽然实现了功能，但是实现的方法有待商榷，希望将来能改进，要改进的地方会在说明中简略说明
- NOTE 在该注释处说明代码如何工作
- HACK 在该注释处编写得不好或格式错误，需要根据自己的需求去调整程序代码
- BUG 在该注释处有 Bug

```js
// TODO功能未完成，待完善
// FIXME  待修复
// XXX    实现方法待确认
// NOTE   代码功能说明
// HACK   此处写法有待优化
// BUG    此处有 Bug
const arr = []

```

**文件注释**:

```js
  /*
   * 简述当前文件功能
   * @author 作者名称
   * @version 版本号 最近编辑时间
   * @description 该版本改动信息
   */

```

**函数注释**:

```js
/**
 * @func
 * @desc 一个带参数的函数
 * @param {string} a - 参数a
 * @param {number} b=1 - 参数b默认值为1
 * @param {string} c=1 - 参数c有两种支持的取值  1—表示x  2—表示xx
 * @param {object} d - 参数d为一个对象
 * @param {string} d.e - 参数d的e属性
 * @param {object[]} g - 参数g为一个对象数组
 * @param {string} g.h - 参数g数组中一项的h属性
 * @param {string} [j] - 参数j是一个可选参数
 */
 function foo(a, b, c, d, g, j) {}

/**
 * @func
 * @desc 一个带若干参数的函数
 * @param {...string} a - 参数a
 * @return {返回值类型} 返回值说明
 */
function bar(a) {}


```
