import React, { Component } from 'react'
import Hub from '../../hub'
import { decrementSpellsCooldown } from '../../actions'

export default class Timer extends Component {
  propTypes: {
    ennemies: React.PropTypes.object.isRequired,
  };

  componentDidUpdate() {
    if (0 === this.props.ennemies.length) return
    this.start()
  }

  get started() {
    return null != this.intervalId
  }

  start() {
    if (this.started) return
    this.intervalId = setInterval(decrementSpellsCooldown, 1000)
  }

  stop() {
    clearInterval(this.intervalId)
    this.intervalId = null
  }

  render() { return null }
}
