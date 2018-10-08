import { assign, has } from "lodash";
import collector from "./collector";
import allProtocols from "./protocols";
import allNodeHandlers from "./nodeHandlers";
import allComponents from "./components";

export default class FireAnt {
  constructor(opt) {
    this.options = assign({}, opt);
    this.init();
  }

  use = plugin => {
    collector.use(plugin);
  };

  config = conf => {
    assign(this.options, conf);
    this.init();
  };

  init = () => {
    const options = this.options;
    this.collector = collector;
    this.premount(options);
    this.preproccess(options);
  };

  getProtocolProcessor = () => {
    return this.collector.protocolsCollector[this.$version];
  };

  premount = options => {
    this.mountComponents();
    this.mountNodeHandlers();
    this.mountProtocols();
  };

  mountProtocols = () => {
    allProtocols.forEach(protocol => {
      collector.use(protocol);
    });
  };

  mountNodeHandlers = () => {
    allNodeHandlers.forEach(nodeHandlers => {
      collector.use(nodeHandlers);
    });
  };

  mountComponents = () => {
    allComponents.forEach(component => {
      collector.use(component);
    });
  };

  preproccess = options => {
    if (has(options, "version")) {
      this.$version = options.version;
    } else {
      this.$version = "default";
      console.warn(
        "Warning: Since the protocol version is not specified, the default version is used "
      );
    }

    if (has(options, "app")) {
      this.$app = options.app;
    } else {
      this.$app = {};
      console.warn("Warning: `app` fields is needed !");
    }
  };

  beforeRender = () => {
    this.protocolProcessor = this.getProtocolProcessor();
  };

  render = () => {
    this.beforeRender();
    return this.protocolProcessor(this.$app, this.collector);
  };
  createApp = () => {
    return this.render();
  };
}
