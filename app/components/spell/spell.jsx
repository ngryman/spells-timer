import React, { Component } from 'react'
import classnames from 'classnames'
import { resetSpellCooldown } from '../../actions'

export default class Spell extends Component {
  propTypes: {
    spell: React.PropTypes.object.isRequired,
  };

  render() {
    const spell = this.props.spell
    return (
      <li key={spell.id} onClick={::this.handleClick}
        className={classnames({ spell: true, available: 0 === spell.cooldown})}>
        {spell.name} {spell.cooldown}
      </li>
    )
  }

  handleClick(e) {
    resetSpellCooldown(this.props.spell)
  }
}
