import React, { Component } from 'react'
import SpeechSynthesis from '../../lib/speech_synthesis'

export default class WarningSpeech extends Component {
  propTypes: {
    monitor: React.PropTypes.array.isRequired
  };

  componentDidMount() {
    this.speech = new SpeechSynthesis()
  }

  shouldComponentUpdate(nextProps) {
    return (0 !== nextProps.monitor.length)
  }

  componentDidUpdate() {
    const notification = this.props.monitor
    .map(createMessage)
    .join(' ')

    this.speech.speak(notification)
  }

  render() { return null }
}

const createMessage = (spell) => {
  let message = `${spell.name} is`
  if (0 === spell.cooldown)
    message += ' now'
  message += ' available'
  if (0 !== spell.cooldown)
    message += ` in ${spell.cooldown} seconds`
  message += '.'

  return message
}
