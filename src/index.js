import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'

const render = () => {
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  )
}

render()