import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'

const bootsrap = () => {
  setTimeout(function() {
    ReactDOM.render(
      <App />,
      document.querySelector('.app')
    )
  }, 2000)
}

if (window.cordova)
  document.addEventListener("deviceready", bootsrap)
else
  bootsrap()
