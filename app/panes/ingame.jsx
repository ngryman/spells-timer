import React, { Component } from 'react'
import Mixin from 'react-mixin'
import Pane from '../mixins/pane'
import State from '../mixins/state'
import List from '../components/list.jsx'
import EnnemyItem from '../components/ennemy_item.jsx'

export default class InGame extends Component {
  constructor() {
    super()

    this.state = {
      ennemies: []
    }
  }

  componentWillMount() {
    this.ennemies = this.context.flux.getStore('ennemies')
    this.ennemies.addListener('change', () => this.setState(this.ennemies.state))
    this.setState(this.ennemies.state)

    this.actions = this.context.flux.getActions('spells')
  }

  render() {
    return (
      <section className={this.sectionClasses('ingame')}>
        <List className="ennemies"
          items={this.state.ennemies}
          itemComponent={EnnemyItem}
          onItemClick={::this.handleSpellClick}
          draggable />
      </section>
    )
  }

  handleSpellClick(spell) {
    if (!spell.counting) {
      this.actions.resetCooldown(spell)
    }
    else {
      this.actions.forwardCooldown(spell)
    }
  }

  handleFinishClick() {
    this.context.navigate('Welcome')
  }
}

Mixin.onClass(InGame, Pane)
Mixin.onClass(InGame, State)
