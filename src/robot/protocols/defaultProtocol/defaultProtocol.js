import { merge, has } from "lodash";
import collector from "../../collector"; // TODO 适合作为全局注册对象
const nodeHandlersCollector = collector.nodeHandlersCollector;
const componentsCollector = collector.componentsCollector;

const createForm = configs => {
  return configs.formFields.map(conf => {
    // props process
    conf.key = conf.name;
    const typeName = conf.type;

    // get component
    const component = componentsCollector[typeName] || null;

    // decide nodeHandler
    let nodeHandler = undefined;
    if (has(conf, "nodeHandler")) {
      const nodeHandlerName = conf["nodeHandler"];
      nodeHandler = nodeHandlersCollector[nodeHandlerName];
    } else {
      if (has(nodeHandlersCollector, typeName)) {
        nodeHandler = nodeHandlersCollector[typeName];
      } else {
        nodeHandler = nodeHandlersCollector["default"];
      }
    }

    // config protocal
    conf.props = merge(conf.props, conf.methods, conf.extends, {
      name: conf.name,
      id: conf.name,
      key: conf.key
    });

    // render node
    return component && nodeHandler(component, conf);
  });
};

const render = configs => {
  return createForm(configs);
};
export default render;
