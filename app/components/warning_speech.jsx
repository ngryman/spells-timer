import React, { Component } from 'react'
import Mixin from 'react-mixin'
import State from '../mixins/state'
import SpeechSynthesis from '../../lib/speech/speech'

const supportMessages = [
  'Be careful summoner.',
  'Take care of your little attributes.',
  "It's down the wall best seen the wall.",
  [ "I always wanted to do something else... Well, good luck anyway...", 2 ]
]

export default class WarningSpeech extends Component {
  constructor() {
    super()

    this.state = {
      spells: []
    }
  }

  componentDidMount() {
    this.speech = new SpeechSynthesis()

    this.store = this.context.flux.getStore('ennemies')
    this.store.addListener('change', () =>
      this.setState({ spells: this.store.getWarningSpells() })
    )

    this.ennemies = this.context.flux.getStore('ennemies')
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (0 !== nextState.spells.length)
  }

  componentDidUpdate() {
    const spells = this.state.spells
    this.sayWarningMessages(spells)
    // this.sayRandomSupportMessage(spells)
  }

  render() { return null }

  sayWarningMessages(spells) {
    const text = spells
      .map(::this.createMessage)
      .join(' ')

    this.speech.speak(text)
    console.log(text)
  }

  sayRandomSupportMessage(spells) {
    if (spells.find(spell => spell.cooldown <= 0)) {
      const message = supportMessages[Math.random() * supportMessages.length | 0]
      if (Array.isArray(message))
        this.speech.speak(message[0], message[1])
      else
        this.speech.speak(message)
    }
  }

  createMessage(spell) {
    const ennemy = this.ennemies.getEnnemyBySpell(spell)

    let message = `${ennemy.champion.name}'s ${spell.name} is`
    if (0 === spell.cooldown)
      message += ' now'
    message += ' available'
    if (spell.cooldown > 0)
      message += ` in ${spell.cooldown} seconds`
    message += '.'

    return message
  }
}

Mixin.onClass(WarningSpeech, State)
