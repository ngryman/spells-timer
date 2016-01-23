import React, { Component } from 'react'
import Mixin from 'react-mixin'
import State from '../mixins/state'
import SpeechSynthesis from '../../lib/speech_synthesis'

const supportMessages = [
  'Be careful summoner.',
  'Take care of your little attributes.',
  "It's down the wall best seen the wall.",
  [ "I always wanted to do something else... Well, good luck anyway...", 2 ]
]

export default class WarningSpeech extends Component {
  propTypes: {
    monitorSpells: React.PropTypes.array.isRequired,
    ennemies: React.PropTypes.array.isRequired
  };

  componentDidMount() {
    this.speech = new SpeechSynthesis()
    this.store = this.context.flux.getStore('game')
  }

  shouldComponentUpdate(nextProps) {
    return (0 !== nextProps.monitorSpells.length)
  }

  componentDidUpdate() {
    const spells = this.props.monitorSpells
    this.sayWarningMessages(spells)
    this.sayRandomSupportMessage(spells)
  }

  render() { return null }

  sayWarningMessages(spells) {
    let text = spells
      .map(::this.createMessage)
      .join(' ')

    this.speech.speak(text)
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
    const ennemy = this.store.getEnnemyBySpell(spell)

    let message = `${ennemy.champion.name}'s' ${spell.name} is`
    if (0 === spell.cooldown)
      message += ' now'
    message += ' available'
    if (0 !== spell.cooldown)
      message += ` in ${spell.cooldown} seconds`
    message += '.'

    return message
  }
}

Mixin.onClass(WarningSpeech, State)
