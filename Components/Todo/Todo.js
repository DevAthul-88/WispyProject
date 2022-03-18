import React from 'react'
import Index from './Index'
import Alert from '../Alert'

function Todo({todo}) {
  return (
    <div>
      {
        todo.length <= 1 ? <Alert description={"No todos found!"} type="error" trigger/> : <Index />
      }
    </div>
  )
}

export default Todo