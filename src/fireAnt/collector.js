import { assign, has, camelCase } from "lodash";
// import protocolsCollector from "./versionToProtocolMap";
// import nodeHandlersCollector from "./nodeHandlersCollectorMap";
// import componentsCollector from "./componentsCollectorMap";

const nameFormatter = name => {
  return camelCase(name);
};

class Collector {
  constructor(props) {
    this.componentsCollector = {};
    this.nodeHandlersCollector = {};
    this.protocolsCollector = {};
  }

  use = plugin => {
    if (has(plugin, "install")) {
      plugin.install(this);
    } else {
      throw new Error("Error: Plugin need `install` methods !");
    }
  };

  installComponent = (type, Component) => {
    const componentsCollector = this.componentsCollector;
    this.componentsCollector = assign(componentsCollector, {
      [nameFormatter(type)]: Component
    });
  };

  installElementCreator = (name, elementCreator) => {
    const nodeHandlersCollector = this.nodeHandlersCollector;
    this.nodeHandlersCollector = assign(nodeHandlersCollector, {
      [nameFormatter(name)]: elementCreator
    });
  };

  installProtocols = (version, protocol) => {
    const protocolsCollector = this.protocolsCollector;
    this.protocolsCollector = assign(protocolsCollector, {
      [version]: protocol
    });
  };
}

export default new Collector();
