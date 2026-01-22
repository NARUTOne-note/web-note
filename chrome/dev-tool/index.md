# chrome dev-tool

## 条件断点

> 假设有一个包含 200 个元素的循环，但是你只对第 110 次循环的结果感兴趣，又或者你只对一些满足某些条件的结果感兴趣

- 右击行号，选择 Add conditional breakpoint...(添加条件断点)
- 或者右击一个已经设置的断点并且选择 Edit breakpoint(编辑断点)
- 然后输入一个执行结果为 true 或者 false 的表达式（它的值其实不需要完全为 true 或者 false 尽管那个弹出框的描述是这样说的）

在这个表达式中你可以使用任何这段代码可以获取到的值（当前行的作用域）

![Add conditional breakpoint](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/17/167b94b8f36112b7~tplv-t2oaga2asx-jj-mark:1890:0:0:0:q75.awebp)

**条件断点新玩法**
![console.log](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/17/167b955a1f0311fc~tplv-t2oaga2asx-jj-mark:1890:0:0:0:q75.awebp)

## console

1、console.assert  第一个参数为 假 时，console.assert 打印跟在这个参数后面的值。

```js
console.assert(assertion, obj1 [, obj2, ..., objN]);
console.assert(assertion, msg [, subst1, ..., substN]); // c-like message formatting
```

2、console.table 数组（类数组）表格打印，使用第二个参数，传入你想要展示的列

3、console.dir 打印元素节点，查看具体属性

4、console.time(xx) — 开启一个计时器
5、console.timeEnd(xx) — 结束计时并且将结果在 console 中打印出来

## live expression 

![live expression ](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/29/167f82b33009449f~tplv-t2oaga2asx-jj-mark:1890:0:0:0:q75.awebp)
