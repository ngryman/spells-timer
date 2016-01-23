import React, { Component } from 'react'
import Mixin from 'react-mixin'
import Pane from '../../mixins/pane'
import State from '../../mixins/state'
import EnnemiesList from '../../components/ennemies_list.jsx'
import Timer from '../../components/timer.jsx'
import VoiceController from '../../components/voice_controller.jsx'

export default class InGame extends Component {
  constructor() {
    super()

    this.state = {
      ennemies: [],
      spells: []
    }
  }

  componentWillMount() {
    this.store = this.context.flux.getStore('game')
    this.spellActions = this.context.flux.getActions('spell')

    this.store.addListener('change', () => this.setState(this.store.state))
    this.setState(this.store.state)
  }

  render() {
    const ennemies = this.state.ennemies
    const spells = this.state.spells

    return (
      <section className={this.sectionClasses()}>
        <EnnemiesList
          ennemies={ennemies}
          spells={spells}
          onSpellClick={::this.handleSpellClick} />

        <Timer
          spells={spells}
          onTick={::this.handleTick}
          on60sMark={::this.handle60sMark}
          on30sMark={::this.handle30sMark} />

        <VoiceController />
      </section>
    )
  }

  handleSpellClick(spell) {
    this.spellActions.resetCooldown(spell)
  }

  handleTick() {
    this.spellActions.decrementCooldowns(this.state.spells)
  }

  handle60sMark() {

  }

  handle30sMark() {

  }
}

Mixin.onClass(InGame, Pane)
Mixin.onClass(InGame, State)
