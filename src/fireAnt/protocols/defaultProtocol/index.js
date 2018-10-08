import protocols from "./defaultProtocol";

const defaultProtocals = {};

defaultProtocals.install = collector => {
  // 集中化安装，install是个约定接口，个人觉得install更好
  collector.installProtocols("0.0.1", protocols);
  collector.installProtocols("default", protocols);
};

export default defaultProtocals;
