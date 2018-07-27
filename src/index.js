import React, { Component } from "react";
import "./styles.scss";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      address: [{ name: "四川" }, { name: "成都市" }, { name: "武侯区" }]
    };
  }

  render() {
    let state = this.state;
    return (
      <div className="rc-address-selector">
        <h2 className="onepx-border">行政区划选择</h2>
        <dl>
          <dt>
            <ul className="rc-ds-address onepx-border">
              {state.address.map((v, i) => (
                <li
                  className={i === state.active ? "active" : ""}
                  key={i}
                  onClick={() => {
                    this.setState({ active: i });
                  }}
                >
                  {v.name}
                </li>
              ))}
            </ul>
          </dt>
          <dd>123</dd>
        </dl>
      </div>
    );
  }
}
