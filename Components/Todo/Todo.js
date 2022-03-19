import React from 'react'
import Index from './Index'
import Alert from '../noData'

function Todo({todo}) {
  return (
    <div>
      {
        todo.length <= 1 ? <Alert title={"No todos found!"} /> : <Index />
      }
    </div>
  )
}

export default Todo