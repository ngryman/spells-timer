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
      <li key={spell.key} className="spell">
        <button disabled={spell.cooldown > 0} onClick={this.props.onSpellClick.bind(this, spell)}>
          <img src={spell.icon} />
          <svg viewBox="0 0 100 100" fill="#f00">
            <path d={arcPath(spell)} transform="translate(50,  50) scale(-1, 1)"></path>
          </svg>
          {spell.cooldown}
        </button>
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

const arcPath = (spell) => {
  const r = 50
  const t = spell.cooldown / spell.refCooldown
  const a = t * Math.PI * 2
  const m = a > Math.PI ? 1 : 0
  const x = Math.sin(a) * r
  const y = Math.cos(a) * -r
  return `M 0,0 v -${r} A ${r} ${r} 1 ${m} 1 ${x} ${y} z`
}
