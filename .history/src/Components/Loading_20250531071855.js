import React from 'react'
import loading from './loading.gif';

const Loading = () => {
    return (
      <div>
        <img style={{ display: 'block', margin: '0 auto' }} alt="Loading" src={loading} />
      </div>
    )
}

export default Loading;
