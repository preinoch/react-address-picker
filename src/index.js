import React, {Component} from 'react'
import './styles.scss'

export default class extends Component {

  
  render() {
    return <div className="rc-address-selector">
      <h2 className="onepx-border">行政区划选择</h2>
      <dl>
        <dt>
          <ul className="rc-ds-address onepx-border">
            <li className={'active' ? }>四川省</li>
            <li>成都市</li>
            <li>武侯区</li>
          </ul>
        </dt>
        <dd>
          123
        </dd>
      </dl>
    </div>
  }
}