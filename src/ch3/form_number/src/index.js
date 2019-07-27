import React from 'react'
import ReactDOM from 'react-dom'
import NumberForm from './NumberForm'

const st = {textAlign: 'center'}
ReactDOM.render(
  <div style={st}>
    <NumberForm />
  </div>,
  document.getElementById('root')
)
