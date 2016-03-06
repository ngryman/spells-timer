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
    this.ennemies = this.context.flux.getStore('ennemies')
    this.ennemies.addListener('change',
      () => this.setState({ spells: this.ennemies.getSpells() })
    )

    this.actions = this.context.flux.getActions('spells')
    this.intervalId = setInterval(::this.tick, 1000)
  }

  tick() {
    this.actions.decrementCooldowns(this.state.spells)
  }

  render() { return null }
}

Mixin.onClass(Timer, State)
