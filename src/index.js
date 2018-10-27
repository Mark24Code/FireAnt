import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import FireAnt from "./fireAnt";
import customProtocol from "./customProtocol/index";
import {
  DivPlugin,
  InputPlugin,
  TagPlugin,
  ButtonPlugin
} from "./plugins/index";

class App extends Component {
  state = {
    name: "默认值"
  };
  configFactory = () => {
    return {
      version: "0.0.1",
      app: {
        formFields: [
          {
            name: "cont",
            type: "div",
            props: {
              className: "cont"
            },
            child: [
              {
                name: "title-cont",
                type: "div",
                props: {
                  className: "title"
                },
                child: "你输入：" + this.state.name
              },
              {
                name: "test",
                type: "button",
                props: {
                  type: "danger"
                },
                methods: {
                  onClick: () => {
                    alert("hello");
                  }
                },
                child: "Click ME"
              },
              {
                name: "name",
                type: "input",
                props: {
                  placeholder: "输入点什么",
                  value: this.state.name
                },
                methods: {
                  onChange: e => {
                    const value = e.target.value;
                    console.log("Your Input:", value);
                    this.setState({
                      name: value
                    });
                  }
                }
              }
            ]
          }
        ]
      }
    };
  };
  buildSth = () => {
    // init instance
    const config = this.configFactory();
    const builder = new FireAnt(config);

    // install protocal
    builder.use(customProtocol);

    // install plugins
    builder.use(DivPlugin);
    builder.use(ButtonPlugin);
    builder.use(InputPlugin);
    builder.use(TagPlugin);

    // use method
    return builder.render();
  };
  render() {
    return (
      <div className="App">
        <div>{this.buildSth()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
