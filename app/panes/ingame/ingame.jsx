import React, { Component } from 'react'
import Mixin from 'react-mixin'
import Pane from '../../mixins/pane'
import State from '../../mixins/state'
import EnnemiesList from '../../components/ennemies_list.jsx'
import WarningSpeech from '../../components/warning_speech.jsx'
import VoiceController from '../../components/voice_controller.jsx'

export default class InGame extends Component {
  constructor() {
    super()

    this.state = {
      ennemies: [],
      spells: [],
      warningSpells: []
    }
  }

  componentWillMount() {
    this.store = this.context.flux.getStore('game')
    this.spellActions = this.context.flux.getActions('spell')

    this.store.addListener('change', () => this.setState(this.store.state))
    this.setState(this.store.state)
  }

  componentDidUpdate() {
    if (0 !== this.state.spells.length && null == this.intervalId)
      this.intervalId = setInterval(::this.tick, 1000)
  }

  render() {
    return (
      <section className={this.sectionClasses()}>
        <EnnemiesList
          ennemies={this.state.ennemies}
          spells={this.state.spells}
          onSpellClick={::this.handleSpellClick} />

        <WarningSpeech monitor={this.state.warningSpells} />
        <VoiceController />
      </section>
    )
  }

  handleSpellClick(spell) {
    this.spellActions.resetCooldown(spell)
  }

  tick() {
    this.spellActions.decrementCooldowns(this.state.spells)
  }
}

Mixin.onClass(InGame, Pane)
Mixin.onClass(InGame, State)
