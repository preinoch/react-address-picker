import React, { Component } from "react";
import { render } from "react-dom";
import "./index.scss";
import ReactAdressSelector from "../../src";
import jsonp from "jsonp";
import {
  Cells,
  CellsTitle,
  Cell,
  CellHeader,
  CellBody,
  CellFooter,
  Page
} from "react-weui";

import "weui";
import "react-weui/build/packages/react-weui.css";

class Demo extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      address: [],
      addressString: ""
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
    this.setState({ show });
  }

  handleAddressChange(address) {
    console.log(address);
    let addressString = address.reduce((a, v)=>(a+v.fullname),'')
    this.setState({ address, addressString });
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
    let { address,addressString, show } = this.state;

    return (
      <div>
        <div className="page__hd">
          <h1 className="page__title">Example</h1>
          <p className="page__desc">示例</p>
        </div>
        <CellsTitle>选择地区</CellsTitle>
        <Cells>
          <Cell
            access
            onClick={() => {
              this.setState({ show: true });
            }}
          >
            <CellBody>选择地址</CellBody>
            <CellFooter>{addressString}</CellFooter>
          </Cell>
        </Cells>
        <ReactAdressSelector
          active={show}
          address={address}
          onAddressChange={this.handleAddressChange.bind(this)}
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
