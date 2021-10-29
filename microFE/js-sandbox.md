# JS沙箱

> 在计算机安全中，沙箱（Sandbox）是一种用于隔离正在运行程序的安全机制，通常用于执行未经测试或不受信任的程序或代码，它会为待执行的程序创建一个独立的执行环境，内部程序的执行不会影响到外部程序的运行。

## 应用场景

- 执行 JSONP 请求回来的字符串时或引入不知名第三方 JS 库时，可能需要创造一个沙箱来执行这些代码。
- Vue 模板表达式的计算是运行在一个沙盒之中的，在模板字符串中的表达式只能获取部分全局对象
- 在线代码编辑器，如 CodeSanbox 等在线代码编辑器在执行脚本时都会将程序放置在一个沙箱中，防止程序访问/影响主页面
- 微前端
- 等等

## 实现方案

### with

with 会在作用域链的顶端添加一个新的作用域，该作用域的变量对象会加入 with 传入的对象，因此相较于外部环境其内部的代码在查找变量时会优先在该对象上进行查找。

```js
// 执行上下文对象
const ctx = {
    func: variable => {
        console.log(variable)
    },
    foo: 'foo'
}

// 非常简陋的沙箱
function veryPoorSandbox(code, ctx) {
    with(ctx) { // Add with
        eval(code)
    }
}

// 待执行程序
const code = `
    foo = 'bar'
    func(foo)
`

veryPoorSandbox(code, ctx) // bar

```

在提供的上下文对象中没有找到某个变量时，代码仍会沿着作用域链一层一层向上查找，这样的一个沙箱仍然无法控制内部代码的执行。我们希望沙箱中的代码只在手动提供的上下文对象中查找变量，如果上下文对象中不存在该变量则直接报错或返回 undefined。

### with + proxy

使用 Proxy.has() 来拦截 with 代码块中的任意变量的访问，并设置一个白名单，在白名单内的变量可以正常走作用域链的访问方式，不在白名单内的变量会继续判断是否存在沙箱自行维护的上下文对象中，存在则正常访问，不存在则直接报错

由于 has 会拦截 with 代码块中所有的变量访问，而我们只是想监控被执行代码块中的程序，因此还需要转换一下手动执行代码的形式

```js
// 构造一个 with 来包裹需要执行的代码，返回 with 代码块的一个函数实例
function withedYourCode(code) {
  code = 'with(globalObj) {' + code + '}'
  return new Function('globalObj', code)
}

// 可访问全局作用域的白名单列表
const access_white_list = ['Math', 'Date']

// 待执行程序
const code = `
    Math.random()
    location.href = 'xxx'
    func(foo)
`

// 执行上下文对象
const ctx = {
    func: variable => {
        console.log(variable)
    },
    foo: 'foo'
}

// 执行上下文对象的代理对象
const ctxProxy = new Proxy(ctx, {
    has: (target, prop) => { // has 可以拦截 with 代码块中任意属性的访问
      if (access_white_list.includes(prop)) { // 在可访问的白名单内，可继续向上查找
          return target.hasOwnProperty(prop)
      }

      if (!target.hasOwnProperty(prop)) {
          throw new Error(`Invalid expression - ${prop}! You can not do that!`)
      }

      return true
    }
})

// 没那么简陋的沙箱

function littlePoorSandbox(code, ctx) {

    withedYourCode(code).call(ctx, ctx) // 将 this 指向手动构造的全局代理对象

}

littlePoorSandbox(code, ctxProxy) 

// Uncaught Error: Invalid expression - location! You can not do that!

```

如何任意使用诸如 document、location 等全局变量且不会影响主页面。
从而又衍生出另一个问题——如何让子程序使用所有全局对象的同时不影响外部的全局状态呢

### iframe

浏览器支持的天然沙箱，在 iframe 中运行的脚本程序访问到的全局对象均是当前 iframe 执行上下文提供的，不会影响其父页面的主体功能，因此使用 iframe 来实现一个沙箱是目前最方便、简单、安全的方法。

试想一个这样的场景：一个页面中有多个沙箱窗口，其中有一个沙箱需要与主页面共享几个全局状态（eg: 点击浏览器回退按钮时子应用也会跟随着回到上一级），另一个沙箱需要与主页面共享另外一些全局状态（eg: 共享 cookie 登录态）。
虽然浏览器为主页面和 iframe 之间提供了 postMessage 等方式进行通信，但单单使用 iframe 来实现这个场景是比较困难且不易维护的。

### With + Proxy + iframe

利用 iframe 对全局对象的天然隔离性，将 iframe.contentWindow 取出作为当前沙箱执行的全局对象
将上述沙箱全局对象作为 with 的参数限制内部执行程序的访问，同时使用 Proxy 监听程序内部的访问。
维护一个共享状态列表，列出需要与外部共享的全局状态，在 Proxy 内部实现访问控制

```js
// 沙箱全局代理对象类
class SandboxGlobalProxy {
    constructor(sharedState) {
        // 创建一个 iframe 对象，取出其中的原生浏览器全局对象作为沙箱的全局对象
        const iframe = document.createElement('iframe', {url: 'about:blank'})
        document.body.appendChild(iframe)
        const sandboxGlobal = iframe.contentWindow // 沙箱运行时的全局对象
        return new Proxy(sandboxGlobal, {
            has: (target, prop) => { // has 可以拦截 with 代码块中任意属性的访问
                if (sharedState.includes(prop)) { // 如果属性存在于共享的全局状态中，则让其沿着原型链在外层查找
                    return false
                }
                if (!target.hasOwnProperty(prop)) {
                    throw new Error(`Invalid expression - ${prop}! You can not do that!`)
                }
                return true
            }
        })
    }
}

function maybeAvailableSandbox(code, ctx) {

  withedYourCode(code).call(ctx, ctx)

}

const code_1 = `

    console.log(history == window.history) // false
    window.abc = 'sandbox'
    Object.prototype.toString = () => {

        console.log('Traped!')

    }
    console.log(window.abc) // sandbox
`

const sharedGlobal_1 = ['history'] // 希望与外部执行环境共享的全局对象
const globalProxy_1 = new SandboxGlobalProxy(sharedGlobal_1)
maybeAvailableSandbox(code_1, globalProxy_1)
window.abc // undefined 

Object.prototype.toString() // [object Object] 并没有打印 Traped

```

## 沙箱逃逸

沙箱于作者而言是一种安全策略，但于使用者而言可能是一种束缚

- 访问沙箱执行上下文中某个对象内部属性时， Proxy 无法捕获到这个属性的访问操作。例如我们可以直接在沙箱的执行上下文中通过 window.parent 拿到外层的全局对象
- 通过访问原型链实现逃逸，JS 可以直接声明一个字面量，沿着该字面量的原型链向上查找原型对象即可访问到外层的全局对象，这种行为亦是无法感知的

```js
const code = `
    ({}).constructor.prototype.toString = () => {
        console.log('Escape!')
    }
`
({}).toString() // Escape!  预期是 [object Object]
```
