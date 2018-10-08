import React from "react";

const ReactCreateElement = (component, conf) => {
  return React.createElement(component, conf.props, conf.children);
};
export default ReactCreateElement;
