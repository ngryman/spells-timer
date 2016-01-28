import React, { Component } from 'react'
import classnames from 'classnames'

export default class EnnemiesList extends Component {
  propTypes: {
    ennemies: React.PropTypes.array.isRequired,
    spells: React.PropTypes.array.isRequired,
    onSpellClick: React.PropTypes.func
  };

  renderSpell(spell) {
    return (
      <li key={spell.key} className={classnames({ spell: true, available: spell.cooldown <= 0})}
        onClick={this.props.onSpellClick.bind(this, spell)}>
        <img src={spell.icon} />
        {spell.cooldown > 0 ? spell.cooldown : 0}
      </li>
    )
  }

  renderEnnemy(ennemy) {
    const spells = this.props.spells.filter(
      (spell) => spell.ennemyKey === ennemy.key
    )

    return (
      <li key={ennemy.key} className="ennemy">
        <figure className="summoner">
          <img src={ennemy.champion.icon} />
        </figure>
        <ul className="spells">{spells.map(::this.renderSpell)}</ul>
      </li>
    )
  }

  render() {
    const ennemies = this.props.ennemies

    return (
      <ul className="ennemies">{ennemies.map(::this.renderEnnemy)}</ul>
    )
  }
}
