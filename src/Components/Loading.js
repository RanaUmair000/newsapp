import React, { Component } from 'react'
import loading from './loading.gif';

export default class Loading extends Component {
  render() {
    return (
      <div>
        <img style={{ display: 'block', margin: '0 auto' }} src={loading} />
      </div>
    )
  }
}
