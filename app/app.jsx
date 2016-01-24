import React, { Component } from 'react'
import AppFlux from './app_flux'

import Navigator from './navigator.jsx'
import Welcome from './panes/welcome.jsx'
import InGame from './panes/ingame.jsx'

export default class App extends Component {
  static childContextTypes = {
    flux: React.PropTypes.object.isRequired
  };

  getChildContext() {
    return { flux: new AppFlux() }
  }

  render() {
    return (
      <Navigator initialPane="Welcome">
        <Welcome />
        <InGame />
      </Navigator>
    )
  }
}
