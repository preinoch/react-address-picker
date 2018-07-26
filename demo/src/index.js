import React, {Component} from 'react'
import {render} from 'react-dom'
import "./index.scss"
import Example from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <button type="button">点击开启</button> 
      <Example/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
