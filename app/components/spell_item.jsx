import React, { Component } from 'react'
import classnames from 'classnames'

const CooldownRadius = 50

export default class SpellItem extends Component {
  propTypes: {
    item: React.PropTypes.object.isRequired
  };

  renderContent(spell) {
    const time = spell.counting ? <span className="spell-time">{spell.cooldown}</span> : null

    return (
      <div className="spell-content">
        {time}
        <img className="spell-icon" src={`img/${spell.id}-icon.svg`} />
      </div>
    )
  }

  renderCooldown(spell) {
    if (!spell.counting) return null

    return (
      <svg className="spell-cooldown"
        viewBox="-3 -3 106 106"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round">
        {drawCooldownPie(spell)}
      </svg>
    )
  }

  render() {
    const spell = this.props.item

    return (
      <li className={classnames({ spell: true, [spell.id]: true, counting: spell.counting })}>
        <button className="spell-button"
          disabled={spell.couting}
          onClick={this.props.onClick.bind(this, spell)}>
          {this.renderCooldown(spell)}
          {this.renderContent(spell)}
        </button>
      </li>
    )
  }
}

const drawCooldownPie = (spell) => {
  const r = CooldownRadius
  const t = 1 - spell.cooldown / spell.refCooldown
  const a = t * Math.PI * 2
  const m = a > Math.PI ? 1 : 0
  const x = Math.sin(a) * r
  const y = Math.cos(a) * -r

  return (
    <g transform={`translate(${r}, ${r})`}>
      <path className="pie" d={`M 0 0 v ${-r} A ${r} ${r} 1 ${m} 1 ${x} ${y} z`}></path>
      <circle className="track" cx="0" cy="0" r={r}></circle>
      <path className="timer" d={`M 0 ${-r} A ${r} ${r} 1 ${m} 1 ${x} ${y}`}></path>
    </g>
  )
}
