import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import Formaker from "./fireAnt";
import divComp from "./testContainerComp";
import Input from "./testInputComp";
import formProtocol from "./testFormProtocol";
import TagPlugin from "./tagPlugin";
import { cloneDeep } from "lodash";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testInput: "default"
    };
  }
  fromConfig = () => {
    return {
      version: "0.0.1",
      app: {
        formFields: [
          {
            name: "test",
            type: "button",
            props: {
              type: "danger"
            },
            methods: {
              onClick: () => {
                console.log("hello");
              }
            },
            child: "测试",
            extends: null,
            nodeHandler: "default"
          },
          {
            name: "test2",
            type: "button",
            props: {
              type: "danger"
            },
            methods: {
              type: "primary"
            },
            child: "testInput",
            extends: null,
            nodeHandler: "default"
          },
          {
            name: "test3",
            type: "input",
            extends: null,
            props: {
              placeholder: this.state.testInput
            },
            nodeHandler: "default"
          },
          {
            name: "test4",
            type: "input",
            props: {
              placeholder: "test4"
            },
            methods: {
              onChange: e => {
                console.log(e.target.value);
                const value = e.target.value;
                this.setState({
                  testInput: value
                });
              }
            },
            extends: null,
            nodeHandler: "default"
          }
        ]
      }
    };
  };
  formaker = () => {
    const formaker = new Formaker(this.fromConfig());
    formaker.use(Input);
    formaker.use(divComp);
    formaker.use(formProtocol);
    formaker.use(TagPlugin);
    return formaker.render();
  };
  render() {
    return (
      <div className="App">
        <p>生成组件</p>
        {JSON.stringify(this.state.testInput)}
        <Button onClick={this.changeConf}>动态改变</Button>
        <div>{this.formaker()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
