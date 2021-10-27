# 重构

> 对软件内部结构的一种调整，目的是在**不改变软件可观察行为的前提下**，提高其可理解性，降低其修改成本。

注意：**不要过早重构，过度优化，简单理解为主**

**原则**:

- 单一功能原则
- 开闭原则
- 里氏替换原则
- 依赖翻转原则
- 接口隔离原则
- KISS原则
- DRY （Do not Repeat Yourself）原则
- 需要时法则

**方式**：

- 合理、简明清晰的变量、函数的命名：语义化，功能化
- DRY 重复代码：封装重复逻辑
- 过长函数 Long Functiuon：解耦功能函数
- 过长参数列表 Long Params: 拆分功能函数、参数对象化
- 全局数据 Global Data: 大写命名、提供修改获取方法
- 可变数据 Mutable Data: 函数式编程零副作用调用