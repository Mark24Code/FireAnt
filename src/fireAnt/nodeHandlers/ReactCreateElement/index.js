import reactCreateElement from "./reactCreateElement";

const defaultElementCreator = {};

defaultElementCreator.install = collector => {
  // 集中化安装，install是个约定接口，个人觉得install更好
  collector.installElementCreator("default", reactCreateElement);
  collector.installElementCreator("reactCreateElement", reactCreateElement);
};

export default defaultElementCreator;
