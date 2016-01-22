import React, { Component } from 'react'
import { resetSpellCooldown } from '../../actions'

export default class Spell extends Component {
  propTypes: {
    spell: React.PropTypes.object.isRequired,
  };

  render() {
    const spell = this.props.spell
    return (
      <li key={spell.id} onClick={::this.handleClick}>{spell.name} {spell.cooldown}</li>
    )
  }

  handleClick(e) {
    resetSpellCooldown(this.props.spell)
  }
}
