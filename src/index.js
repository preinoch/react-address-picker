import React, { Component } from "react";
import "./styles.scss";

const addressCache = []

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      activeStyle: {},
      address: [{ name: "四川" }, { name: "成都市" }, { name: "武侯区" }]
    };
  }

  changeIndex(i) {
    const target = this.refs.rcAddress.childNodes[i];
    const left = target.offsetLeft + "px";
    const right = screen.width - target.offsetLeft - target.offsetWidth + "px";
    this.setState({ activeStyle: { left, right } });
  }

  getChildren() {
    
  }

  componentDidMount() {
    this.changeIndex(0);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount()')
  }

  render() {
    let state = this.state;

    return (
      <div className="rc-address-selector">
        <h2 className="onepx-border">行政区划选择</h2>

        <dl>
          <dt>
            <ul ref="rcAddress" className="rc-ds-address onepx-border">
              {state.address.map((v, i) => (
                <li
                  className={i === state.active ? "active" : ""}
                  key={i}
                  onClick={this.changeIndex.bind(this, i)}
                >
                  {v.name}
                </li>
              ))}
            </ul>
            <div className="rc-ds-active" style={state.activeStyle} />
          </dt>
          <dd>
            <button onClick={this.s}>设置</button>
            <button onClick={this.g}>获取</button>
          </dd>
        </dl>
      </div>
    );
  }
}
