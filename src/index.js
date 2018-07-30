import React, { Component } from "react";
import "./styles.scss";

const addressCache = [];
const unselected = { name: "请选择", id: 0 }

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      activeStyle: {},
      address: [],
      list: []
    };
  }

  changeIndex(i) {
    const target = this.refs.rcAddress.childNodes[i];
    const left = target.offsetLeft + "px";
    const right = screen.width - target.offsetLeft - target.offsetWidth + "px";
    this.setState({ activeStyle: { left, right } });
  }

  none() {
    console.log('it is none')
    this.props.onNone()
  }

  async setList(value, index) {
    let active = this.state.active
    let address = this.state.address
    if(address[active].id === 0) {
      // address[index] = value 
      address.splice(active, 1, value)
      address.push(unselected)
      active += 1
      // debugger
    }else {
      
    }
    
    this.setState({address,active},()=>{
      this.changeIndex(active)
    })  
    
    try{
      let list = await this.props.getChildren(value.id, this.none.bind(this))
      if(list.length !== 0) {
        this.props.onSuccess()
        this.setState({list})
      }
    }catch(e) {
      this.props.onError()
    }
    
    // this.setState({address, list})
  }

  async componentWillMount() {
    // console.log(await this.props.getChildren())
    if (this.state.address.length === 0) {
      let address = [unselected];
      let list = await this.props.getChildren();
      this.setState({ list, address });
      this.changeIndex(0);
    }
    // console.log(list)
  }

  componentDidMount() {
    // this.changeIndex(0);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount()");
  }

  render() {
    let state = this.state;

    return (
      <div className="rc-address-selector">
        <h2 className="onepx-border">行政区划选择</h2>
        <dl>
          <dt>
            {/* <i className="weui-loading"></i> */}
            <ul ref="rcAddress" className="rc-ds-address onepx-border">
              {state.address.map((v, i) => (
                <li
                  className={i === state.active ? "active" : ""}
                  key={i}
                  onClick={this.changeIndex.bind(this, i)}
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
                <li key={i} onClick={this.setList.bind(this, v, i)}>
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
