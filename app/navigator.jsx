import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Navigator extends Component {
  static propTypes = {
    initialPane: React.PropTypes.string.isRequired
  };

  static childContextTypes = {
    navigate: React.PropTypes.func.isRequired
  };

  constructor() {
    super()
    this.state = {
      current: ''
    }
  }

  getChildContext() {
    return { navigate: ::this.navigate }
  }

  componentDidMount() {
    // forces a reflow off the component in order to ensure transition will be properly played
    const el = ReactDOM.findDOMNode(this)
    el.offsetWidth

    this.navigate(this.props.initialPane)
  }

  navigate(name, ...args) {
    const from = this.refs[this.state.current]
    const to = this.refs[name]

    if (from)
      animate(from)
    animate(to)

    this.setState({ current: name })
  }

  render() {
    return (
      <main>
        {React.Children.map(this.props.children, (child) =>
          React.cloneElement(child, { ref: child.type.name })
        )}
      </main>
    )
  }
}

/* -------------------------------------------------------------------------- */

const animate = (pane) => {
  const el = ReactDOM.findDOMNode(pane)
  // el.addEventListener('transitionend', animateDidEnd)
  // el.classList.add('animating')
  el.classList.toggle('active')
}

// const animateDidEnd = function() {
//   this.classList.remove('animating')
//   this.removeEventListener(animateDidEnd)
// }
