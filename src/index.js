import React, { Component } from "react";
import "./styles.scss";

const addressCache = [];
const unselected = { name: "请选择", id: 0 };

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      activeStyle: {},
      address: [],
      list: [],
      // show: this.props.active
    };
  }

  handleAddressClick(value, index) {
    const state = this.state;
    if (index === state.active) {
      return;
    }
    this.changeIndex(index);
    if (index === 0) {
      value.id = "";
    } else {
      value = state.address[index - 1];
    }
    this.setList(value);
  }

  async handleListClick(value, index) {
    let active = this.state.active;
    let address = this.state.address;
    address = address.slice(0, active);
    address.push(value);
    this.setState({ address }, () => {
      this.changeIndex(active);
    });

    const list = await this.setList(value, index);

    if (list.length > 0) {
      address.push(unselected);
      active += 1;
      this.setState({ address, active }, () => {
        this.changeIndex(active);
      });
    }
  }

  handleCancelClick() {
    this.props.onActiveChange(false)
  }

  changeIndex(index) {
    const target = this.refs.rcAddress.childNodes[index];
    const left = target.offsetLeft + "px";
    const right = screen.width - target.offsetLeft - target.offsetWidth + "px";
    this.setState({ activeStyle: { left, right }, active: index });
  }

  none() {
    this.props.onNone();
  }

  async setList(value, index) {
    try {
      let list = await this.props.getChildren(value.id, this.none.bind(this));
      this.props.onSuccess();
      this.setState({ list });
      return list;
    } catch (e) {
      this.props.onError();
    }
  }

  async componentWillMount() {
    if (this.state.address.length === 0) {
      let address = [unselected];
      let list = await this.props.getChildren();
      this.setState({ list, address });
      this.changeIndex(0);
    }
  }

  componentDidMount() {
    // this.changeIndex(0);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount()");
  }

  render() {
    let state = this.state;

    let selectorClass =
      "rc-address-selector" + (this.props.active ? " rc-address-open" : "");

    return (
      <div className={selectorClass}>
        <h2 className="onepx-border">
          行政区划选择<i className="rc-address-across" onClick={this.handleCancelClick.bind(this)}/>
        </h2>
        <dl>
          <dt>
            {/* <i className="weui-loading"></i> */}
            <ul ref="rcAddress" className="rc-ds-address onepx-border">
              {state.address.map((v, i) => (
                <li
                  className={i === state.active ? "active" : ""}
                  key={i}
                  onClick={this.handleAddressClick.bind(this, v, i)}
                >
                  {v.name || v.fullname}
                </li>
              ))}
            </ul>
            <div className="rc-ds-active" style={state.activeStyle} />
          </dt>
          <dd>
            <ul className="rc-adress-list">
              {this.state.list.map((v, i) => (
                <li key={i} onClick={this.handleListClick.bind(this, v, i)}>
                  {v.fullname}
                </li>
              ))}
            </ul>
            {/* <button onClick={this.s}>设置</button>
            <button onClick={this.g}>获取</button> */}
          </dd>
        </dl>
      </div>
    );
  }
}
