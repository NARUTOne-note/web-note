# 布局

> (app) page layout

## 响应式布局

> 响应式布局指的是同一页面在不同屏幕尺寸下有不同的布局, 响应式布局只要开发一套就够

**优点**:

- 面对不同分辨率设备灵活性强
- 能够快捷解决多设备显示适应问题

**缺点**:

- 仅适用布局、信息、框架并不复杂的部门类型网站
- 兼容各种设备工作量大，效率低下
- 代码累赘，会出现隐藏无用的元素，加载时间加长
- 其实这是一种折中性质的设计解决方案，多方面因素影响而达不到最佳效果
- 一定程度上改变了网站原有的布局结构，会出现用户混淆的情况

### 媒体查询

> `@media`针对不同媒体，定义不同样式

```css
@media screen and (max-width: 960px){
    body{
      background-color:#FF6699
    }
}

@media screen and (max-width: 768px){
    body{
      background-color:#00FF66;
    }
}
```

**为不同分辨率的屏幕，设置不同的背景图片**。比如给小屏幕手机设置@2x图，为大屏幕手机设置@3x图，通过媒体查询就能很方便的实现。

但是媒体查询的缺点也很明显，如果在浏览器大小改变时，需要改变的样式太多，那么多套样式代码会很繁琐。

### 百分比%

> 当浏览器的宽度或者高度发生变化时，通过百分比单位，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。

height,width属性的百分比依托于父标签的宽高。但是，padding、border、margin等属性的情况又不一样？

- 子元素的top和bottom如果设置百分比，则相对于直接非static定位(默认定位)的父元素的高度，同样，子元素的left和right如果设置百分比，则相对于直接非static定位(默认定位的)父元素的宽度。

- 子元素的padding如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的width，而与父元素的height无关。

- 子元素的margin如果设置成百分比，不论是垂直方向还是水平方向，都相对于直接父元素的width

- border-radius不一样，如果设置border-radius为百分比，则是相对于自身的宽度

**缺点**:

- 计算困难，如果我们要定义一个元素的宽度和高度，按照设计稿，必须换算成百分比单位。

- 各个属性中如果使用百分比，相对父元素的属性并不是唯一的。比如width和height相对于父元素的width和height，而margin、padding不管垂直还是水平方向都相对比父元素的宽度、border-radius则是相对于元素自身等等，造成我们使用百分比单位容易使布局问题变得复杂。

- 所以，不建议用%来做响应式布局。

### vw/vh

css3中引入了一个新的单位vw/vh，与视图窗口有关，vw表示相对于视图窗口的宽度，vh表示相对于视图窗口高度。 任意层级元素，在使用vw单位的情况下，1vw都等于视图宽度的百分之一。

与百分比布局很相似，但更好用

### rem/em

- rem单位是相对于字体大小的html元素，也称为根元素。 默认情况下，html元素的font-size为16px。所以此时1rem = 16px。

- em单位相对于父元素字体大小

```js
//动态为根元素设置字体大小
function init () {
    // 获取屏幕宽度
    var width = document.documentElement.clientWidth
    // 设置根元素字体大小。此时为宽的10等分
    document.documentElement.style.fontSize = width / 10 + 'px'
}

//首次加载应用，设置一次
init()
// 监听手机旋转的事件的时机，重新设置
window.addEventListener('orientationchange', init)
// 监听手机窗口变化，重新设置
window.addEventListener('resize', init)

```

### 移动端响应式布局 viewport

```js
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

- width=device-width: 是自适应手机屏幕的尺寸宽度。
- maximum-scale:是缩放比例的最大值。
- minimum-scale:是缩放比例的最小值。
- inital-scale:是缩放的初始化。
- user-scalable:是用户的可以缩放的操作。

>这个写法是用户不能缩放的页面设计。因为，如果页面能缩放的话，就会影响用户的体验，在手机端，我们都可以找到点击的按钮或者自己感兴趣的菜单进行操作。其二：就是我们如果让页面缩放的话，就完全暴露了我们手机app的程序是html的架构了。所以，我们专为移动端的设计页面的时候，就不需要用户进行缩放了。

## 自适应 与 响应式

响应式：只需要开发一套代码。 响应式设计通过检测视口分辨率，针对不同客户端在客户端做代码处理，来展现不同的布局和内容。
自适应：需要开发多套界面。 通过检测视口分辨率，来判断当前访问的设备是：pc端、平板、手机，从而请求服务层，返回不同的页面。
