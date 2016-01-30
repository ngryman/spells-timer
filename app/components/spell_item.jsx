import React, { Component } from 'react'

export default class SpellItem extends Component {
  propTypes: {
    item: React.PropTypes.object.isRequired
  };

  render() {
    const spell = this.props.item

    return (
      <li className="spell">
        <button disabled={spell.cooldown > 0} onClick={this.props.onClick.bind(this, spell)}>
          <img src={spell.icon} />
          <svg viewBox="0 0 100 100" fill="#f00">
            {drawCooldownPie(spell)}
          </svg>
          {spell.cooldown}
        </button>
      </li>
    )
  }
}

const drawCooldownPie = (spell) => {
  const r = 50
  const t = spell.cooldown / spell.refCooldown

  if (1 === t)
    return <circle cx={r} cy={r} r={r}></circle>

  const a = t * Math.PI * 2
  const m = a > Math.PI ? 1 : 0
  const x = Math.sin(a) * r
  const y = Math.cos(a) * -r

  return <path d={`M 0,0 v -${r} A ${r} ${r} 1 ${m} 1 ${x} ${y} z`}
    transform="translate(50,  50) scale(-1, 1)"></path>
}
