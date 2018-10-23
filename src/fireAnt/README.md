# Intro

## 1. 基础结构
  {
    version: "0.0.1",
    app: {}
  };

  `version`: 指定协议版本
  
  `app` 是核心防止配置的地方，自定义协议处理的是 `app` 对象


## protocal 0.0.1

### 配置结构
{
    version: "0.0.1",
    app: {
      formFields: [
        {
          name: "test",
          type: "button",
          props: {
            type: "danger"
          },
          methods: {
            onClick: () => {
              console.log("hello");
            }
          },
          child: "测试",
          extends: null,
          nodeHandler: "default"
        },
};

### 协议0.0.1 介绍


#### 属性

* name: 作为name、id、key
* type：作为匹配组件的基础
* props：熟悉
* methods：方法
* child：子元素,可以是数组，或者是对象
* extends: 自定义拓展
* nodeHandler: 处理节点的方法，如果没有默认使用default(React.createElement)

methods,extends，name，name生成的id、key会并入props传给组件
因为，default处理节点的方式是 React.createElement
这里遵循，createElement需要的参数

#### 执行

```javascript
// 1. 生成实例
const conf = { ... }
this.app = new Robot(conf); 

this.app.config(conf); // 延时加载conf的接口

// 2. 安装自定义插件

this.app.use(CustomPlugin)

// 3. 生成React节点

{this.app.render()}

```
# TODO

1. 类型检查
  props
  methods

2. 配合类型检查，抛出的异常

3. 包管理，

4. 协议中加工合并属性后，应该去移除掉。
  child, extends etc.


## 使用Tips：

1. 如果是一个纯展示的，
那么你需要在 constructor里面去声明整个builder的过程

2. 如果是一个能够反复工作的组件

那么你需要在 容器组件的内部，声明换一个builder函数，
然后内部声明整个，安装和构建过程。
在最后容器的 render中去使用这个函数。

当你的state变化，函数会被重新运行。

页面组件即时被重新解释。组件将会渲染。

这里配置选项中，可以使用 this.state的引用，等等。这时候的props的表现，更像真实的props。


3. TODO，2点弥补了1点只能工作一次的问题。但是2点可能带来性能问题。
所以可能需要一个类似Vue一样的全局唯一实例，来控制一些中心对象的生成。
