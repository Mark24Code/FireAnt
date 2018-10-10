import { Tag } from "antd";

const defaultComponent = {};

defaultComponent.install = collector => {
  collector.installComponent("tag", Tag);
};

export default defaultComponent;
