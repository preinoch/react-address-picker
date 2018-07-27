import React, { Component } from "react";
import { render } from "react-dom";
import "./index.scss";
import Example from "../../src";
import jsonp from "jsonp";

class Demo extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  des() {
    // console.log(this)
    // ReactDOM.unmountComponentAtNode(document.querySelector('#demo'))
    this.setState({ show: !this.state.show });
  }

  async getchildren(id) {
    jsonp(
      "https://apis.map.qq.com/ws/district/v1/getchildren?key=X3LBZ-BVMKW-VIIRL-RHBWD-KNYJH-VSF7G&output=jsonp" +
        (id ? '&id='+id : ''),
      {
        name: "QQmap"
      },
      (err, data) => {
        if(data.status === 0) {
          return data.result
        }else {
          throw new Error(data)
        }
      }
    );
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            this.getchildren(110000);
          }}
        >
          点击开启
        </button>
        {this.state.show ? <Example ref="rc" /> : ""}
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
