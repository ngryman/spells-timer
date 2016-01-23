import React, { Component } from 'react'
import SpeechSynthesis from '../../lib/speech_synthesis'

export default class Timer extends Component {
  propTypes: {
    spells: React.PropTypes.array.isRequired,
    onTick: React.PropTypes.func,
    on60sMark: React.PropTypes.func,
    on30sMark: React.PropTypes.func
  };

  componentDidMount() {
    this.speech = new SpeechSynthesis()
  }

  componentWillReceiveProps() {
    if (0 === this.props.spells.length) return

    this.startTimer()
    this.dispatchNotifications()
  }

  startTimer() {
    if (null == this.intervalId)
      this.intervalId = setInterval(this.props.onTick, 1000)
  }

  dispatchNotifications() {
    const spells = this.props.spells
    .filter(::this.eligibleSpells)
    .sort(::this.sortSpells)

    const notification = spells
    .map(::this.createMessage)
    .join(' ')

    this.dispatch(notification)
  }

  eligibleSpells(spell) {
    return (
      0 === spell.cooldown || 30 === spell.cooldown || 60 === spell.cooldown
    )
  }

  sortSpells(spell1, spell2) {
    return spell1.cooldown - spell2.cooldown
  }

  createMessage(spell) {
    let message = `${spell.name} is`
    if (0 === spell.cooldown)
      message += ' now'
    message += ' available'
    if (0 !== spell.cooldown)
      message += ` in ${spell.cooldown} seconds`
    message += '.'

    return message
  }

  dispatch(notification) {
    if (0 !== notification.length)
      this.speech.speak(notification)
  }

  render() { return null }
}
