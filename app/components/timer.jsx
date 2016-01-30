import React, { Component } from 'react'
import Mixin from 'react-mixin'
import State from '../mixins/state'

export default class Timer extends Component {
  constructor() {
    super()

    this.state = {
      spells: []
    }
  }

  componentWillMount() {
    this.spells = this.context.flux.getStore('spells')
    this.spells.addListener('change', () => this.setState(this.spells.state))
    this.setState(this.spells.state)

    this.actions = this.context.flux.getActions('spells')
  }

  componentDidUpdate() {
    if (0 !== this.state.spells.length && null == this.intervalId)
      this.intervalId = setInterval(::this.tick, 1000)
  }

  tick() {
    this.actions.decrementCooldowns(this.state.spells)
  }

  render() { return null }
}

Mixin.onClass(Timer, State)
