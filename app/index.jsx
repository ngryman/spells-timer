import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'

const bootsrap = () => {
  ReactDOM.render(
    <App />,
    document.querySelector('.app')
  )
}

if (window.cordova)
  document.addEventListener("deviceready", () => setTimeout(bootsrap, 6000))
else
  bootsrap()
