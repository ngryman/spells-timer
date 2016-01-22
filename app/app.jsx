import React, { Component } from 'react'

import Navigator from './navigator.jsx'
import Welcome from './panes/welcome/welcome.jsx'
import InGame from './panes/ingame/ingame.jsx'

export default class App extends Component {
  render() {
    return (
      <Navigator initialPane="Welcome">
        <Welcome />
        <InGame />
      </Navigator>
    )
  }
}
