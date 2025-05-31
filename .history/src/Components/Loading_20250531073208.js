import React from 'react'
import spinner from './loading.gif';

const Loading = () => {
    return (
      <div>
        <img style={{ display: 'block', margin: '0 auto' }} alt="Loading" src={spinner} />
      </div>
    )
}

export default Loading;
