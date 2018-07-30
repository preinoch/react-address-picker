import React, { Component } from "react";
import { render } from "react-dom";
import "./index.scss";
import ReactAdressSelector from "../../src";
import jsonp from "jsonp";
import { resolve } from "path";
import { reject } from "when";

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

  handleSuccess() {
    console.log("handleSuccess");
  }

  handleError() {
    console.log("handleError");
  }

  handleNone() {
    console.log("handleNone");
  }

  handleActiveChange(show) {
    this.setState({show})
  }

  async componentDidMount() {
    // console.log(await this.getchildren());
    // console.log(this.getchildren());
    // console.log(this.getchildren());
  }

  getchildren(id, none) {
    return new Promise((resolve, reject) => {
      jsonp(
        "https://apis.map.qq.com/ws/district/v1/getchildren?key=X3LBZ-BVMKW-VIIRL-RHBWD-KNYJH-VSF7G&output=jsonp" +
          (id ? "&id=" + id : ""),
        {
          name: "QQmap"
        },
        (err, data) => {
          // console.log(data)
          if (data.status === 0) {
            resolve(data.result[0]);
          } else if (data.status === 363) {
            none();
          } else {
            reject(data);
          }
        }
      );
    });
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            this.setState({ show: !this.state.show });
          }}
        >
          switch
        </button>
        <ReactAdressSelector
          active={this.state.show}
          onActiveChange={this.handleActiveChange.bind(this)}
          getChildren={this.getchildren}
          onSuccess={this.handleSuccess}
          onError={this.handleError}
          onNone={this.handleNone}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
