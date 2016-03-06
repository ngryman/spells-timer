import React, { Component } from 'react'
import Mixin from 'react-mixin'
import Draggable from '../mixins/draggable'

export default class List extends Component {
  propTypes: {
    items: React.PropTypes.array.isRequired,
    itemComponent: React.PropTypes.func.isRequired,
    onItemTap: React.PropTypes.func,
    onItemPress: React.PropTypes.func
  };

  renderItem(item) {
    return (
      React.createElement(this.props.itemComponent, {
        key: item.key,
        item,
        onTap: this.props.onItemTap,
        onPress: this.props.onItemPress
      })
    )
  }

  render() {
    return (
      <ul className={this.props.className}>
        {this.props.items.map(::this.renderItem)}
      </ul>
    )
  }
}

Mixin.onClass(List, Draggable)
