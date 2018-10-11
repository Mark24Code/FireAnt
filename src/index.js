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
      formConfig: {
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
              child: "测试2222",
              extends: null,
              nodeHandler: "default"
            },
            {
              name: "test3",
              type: "input",
              extends: null,
              nodeHandler: "default"
            },
            {
              name: "test4",
              type: "input",
              props: {
                placeholder: "teAAAA"
              },
              extends: null,
              nodeHandler: "default"
            }
          ]
        }
      }
    };
  }
  changeConf = () => {
    const addition = {
      name: "test5",
      type: "divComp",
      props: {
        placeholder: "teAAAA"
      },
      extends: null,
      nodeHandler: "default",
      // children: "test",
      child: [
        {
          name: "test6",
          type: "divComp",
          props: {
            placeholder: "testChild"
          },
          extends: null,
          nodeHandler: "default",
          child: [
            {
              name: "test7",
              type: "tag",
              props: {
                color: "magenta"
              },
              child: "ssss"
            }
          ]
        }
      ]
    };

    const formConfig = cloneDeep(this.state.formConfig);
    console.log(formConfig);
    formConfig.app.formFields.push(addition);
    console.log("----");
    console.log(formConfig);

    this.setState({
      formConfig
    });
  };

  formaker = () => {
    const formaker = new Formaker(this.state.formConfig);
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
        <Button onClick={this.changeConf}>动态改变</Button>
        <div>{this.formaker()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
