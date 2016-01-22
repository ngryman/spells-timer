import React, { Component } from 'react'
import Mixin from 'react-mixin'
import Pane from '../../mixins/pane'
import Hub from '../../hub'
import Spell from '../../components/spell/spell.jsx'
import Timer from '../../components/timer/timer.jsx'
import VoiceController from '../../components/voice_controller/voice_controller.jsx'

export default class InGame extends Component {
  constructor() {
    super()

    this.state = {
      ennemies: []
    }
  }

  componentDidMount() {
    Hub.on('ennemies', (ennemies) => {
      this.setState({ ennemies })
    })

    Hub.on('spells_cooldown', (ennemies) => {
      this.setState({ ennemies })
    })
  }

  renderSpell(spell) {
    return <Spell key={spell.id} spell={spell} />
  }

  renderEnnemy(ennemy) {
    return (
      <li key={ennemy.id}>
        <figure>
          <img src={ennemy.champion.icon} />
          <figcation>{ennemy.name}</figcation>
        </figure>
        <ul>{ennemy.spells.map(::this.renderSpell)}</ul>
      </li>
    )
  }

  render() {
    const ennemies = this.state.ennemies
    return (
      <section className={this.sectionClasses()}>
        <ul>{ennemies.map(::this.renderEnnemy)}</ul>
        <Timer ennemies={this.state.ennemies} />
        <VoiceController />
      </section>
    )
  }
}

Mixin.onClass(InGame, Pane)
