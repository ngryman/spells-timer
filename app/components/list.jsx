import React, { Component } from 'react'

export default class List extends Component {
  propTypes: {
    items: React.PropTypes.array.isRequired,
    itemComponent: React.PropTypes.func.isRequired,
    onItemClick: React.PropTypes.func
  };

  renderItem(item) {
    return (
      React.createElement(this.props.itemComponent, {
        key: item.key,
        item,
        onClick: this.props.onItemClick
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
