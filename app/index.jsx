import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'
import FastClick from 'fastclick'

const bootsrap = () => {
  FastClick(document.body)

  ReactDOM.render(
    <App />,
    document.querySelector('.app')
  )
}

if (window.cordova)
  document.addEventListener("deviceready", bootsrap)
else
  bootsrap()
