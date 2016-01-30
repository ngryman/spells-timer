import React, { Component } from 'react'
import List from './list.jsx'
import SpellItem from './spell_item.jsx'

export default class EnnemyItem extends Component {
  propTypes: {
    item: React.PropTypes.object.isRequired
  };

  render() {
    const ennemy = this.props.item

    return (
      <li className="ennemy">
        <figure className="summoner">
          <img src={ennemy.champion.icon} />
        </figure>

        <List className="spells"
          items={ennemy.spells}
          itemComponent={SpellItem}
          onItemClick={this.props.onClick} />
      </li>
    )
  }
}
