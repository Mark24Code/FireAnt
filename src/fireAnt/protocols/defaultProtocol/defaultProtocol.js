import {
  merge,
  has,
  isArray,
  isNil,
  isString,
  isObject,
  isNumber
} from "lodash";

class Builder {
  constructor(configs, collector) {
    this.configs = configs;
    this.collector = collector;
    this.nodeHandlersCollector = collector.nodeHandlersCollector;
    this.componentsCollector = collector.componentsCollector;
  }

  transToNode = conf => {
    // recursion stop
    if (isNil(conf)) {
      return null;
    }
    if (isString(conf) || isNumber(conf)) {
      return conf;
    }

    // array type process
    if (isArray(conf)) {
      const confArray = conf;
      return confArray.map(confItem => {
        return this.transToNode(confItem);
      });
    }

    // core unit process
    if (isObject(conf)) {
      // props process
      conf.key = conf.name;
      const typeName = conf.type;

      // get component
      const component = this.componentsCollector[typeName] || null;

      // decide nodeHandler
      let nodeHandler = undefined;
      if (has(conf, "nodeHandler")) {
        const nodeHandlerName = conf["nodeHandler"];
        nodeHandler = this.nodeHandlersCollector[nodeHandlerName];
      } else {
        if (has(this.nodeHandlersCollector, typeName)) {
          nodeHandler = this.nodeHandlersCollector[typeName];
        } else {
          nodeHandler = this.nodeHandlersCollector["default"];
        }
      }

      // config protocal
      conf.props = merge(conf.props, conf.methods, conf.extends, {
        name: conf.name,
        id: conf.name,
        key: conf.key
      });

      // children recursion
      const childConf = conf.child;
      if (!isNil(childConf)) {
        conf.children = this.transToNode(childConf);
      }
      // render node
      return component && nodeHandler(component, conf);
    }
  };

  render = () => {
    return this.transToNode(this.configs);
  };
}

// 协议执行时候，默认 第一个参数是配置，第二个参数是内部收集对象，可以访问其他收集器
const render = (configs, collector) => {
  const formConf = configs.formFields; // 对约定字段处理，这里是特殊部分
  const builder = new Builder(formConf, collector); // TODO 单一实例，节省内存
  return builder.render();
};
export default render;
