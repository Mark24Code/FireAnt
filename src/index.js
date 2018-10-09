import React, { Component } from "react";
import ReactDOM from "react-dom";
import Formaker from "./fireAnt";
import divComp from "./testContainerComp";
import Input from "./testInputComp";
import formProtocol from "./testFormProtocol";

class App extends Component {
  constructor(props) {
    super(props);
    this.formaker = new Formaker(this.formConfig);
    this.formaker.use(Input);
    this.formaker.use(divComp);
    this.formaker.use(formProtocol);
  }
  formConfig = {
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
        },
        {
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
                  type: "input",
                  props: {
                    placeholder: "testChild"
                  },
                  extends: null,
                  nodeHandler: "default"
                }
              ]
            }
          ]
        }
      ]
    }
  };
  render() {
    return (
      <div className="App">
        <p>生成组件</p>
        <div>{this.formaker.render()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
