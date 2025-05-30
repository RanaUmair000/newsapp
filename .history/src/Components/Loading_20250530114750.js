import React from 'react'
import loading from './loading.gif';

const Loading = () => {
  render() {
    return (
      <div>
        <img style={{ display: 'block', margin: '0 auto' }} src={loading} />
      </div>
    )
  }
}
