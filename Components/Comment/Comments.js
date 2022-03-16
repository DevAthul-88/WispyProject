import React from 'react'
import Message from '../../Components/noData'

function Comments({comment}) {
  return (
    <div>
      {
        !comment ? <Message title={"no comments"}/> : <></>
      }
    </div>
  )
}

export default Comments