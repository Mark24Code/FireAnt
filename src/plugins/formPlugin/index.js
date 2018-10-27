import { Form } from "antd";

const defaultComponent = {};

defaultComponent.install = collector => {
  // 集中化安装，install是个约定接口，个人觉得install更好
  collector.installComponent("form", Form);
};

export default defaultComponent;
