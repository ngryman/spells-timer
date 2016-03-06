import React, { Component } from 'react'
import List from './list.jsx'
import SpellItem from './spell_item.jsx'
import ChampionColors from '../../lib/champion_colors'

export default class EnnemyItem extends Component {
  propTypes: {
    item: React.PropTypes.object.isRequired
  };

  render() {
    const ennemy = this.props.item
    const color = ChampionColors[ennemy.champion.id]

    return (
      <li className="ennemy" style={{ background: color }}>
        <figure className="summoner" style={{ color }}>
          <img className="summoner-img" src={ennemy.champion.icon} />
        </figure>

        <List className="spells"
          items={ennemy.spells}
          itemComponent={SpellItem}
          onItemTap={this.props.onTap}
          onItemPress={this.props.onPress} />
      </li>
    )
  }
}
