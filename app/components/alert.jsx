import React, { Component } from 'react'
import SpeechSynthesis from '../../lib/speech_synthesis'

export default class Alert extends Component {
  constructor() {
    super()

    this.state = {
      treated: []
    }
  }

  propTypes: {
    spells: React.PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.speech = new SpeechSynthesis()
  }

  componentWillReceiveProps() {
    if (0 === this.props.spells.length) return
    this.monitor()
  }

  update() {
  }

  monitor() {
    this.props.spells
    .filter(
      (spell) => 0 === spell.cooldown && !~this.state.treated.indexOf(spell.key)
    )
    .map((spell) => ({
      key: spell.key,
      message: `${spell.name} is now available`
    }))
    .forEach((alert) => {
      this.speech.speak(alert.message)
      this.state.treated.push(alert.key)
    })


    // const alerts = getSpells()
    // .filter(spell => 0 === spell.cooldown)
    // .map(spell => {
    //   return {
    //     message: ``
    //   }
    // })
  }

  render() { return null }
}
