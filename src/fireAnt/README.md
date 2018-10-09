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


