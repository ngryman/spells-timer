import React, { Component } from 'react'
import AppFlux from './app_flux'

import { Navigator, Pane } from './navigator.jsx'
import Welcome from './panes/welcome.jsx'
import InGame from './panes/ingame.jsx'
import Timer from './components/timer.jsx'
import WarningSpeech from './components/warning_speech.jsx'

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
        <Pane component={Welcome} />
        <Pane component={InGame} />

        <Timer />
        <WarningSpeech />
      </Navigator>
    )
  }
}
