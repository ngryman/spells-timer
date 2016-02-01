import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class Pane extends Component {
  static propTypes = {
    component: React.PropTypes.func.isRequired
  };
}

/* -------------------------------------------------------------------------- */

export class Navigator extends Component {
  static propTypes = {
    initialPane: React.PropTypes.string.isRequired
  };

  static childContextTypes = {
    navigate: React.PropTypes.func.isRequired
  };

  constructor() {
    super()
    this.state = {
      current: '',
      next: ''
    }
  }

  getChildContext() {
    return { navigate: ::this.navigate }
  }

  componentWillMount() {
    this.setState({ current: this.props.initialPane })
  }

  componentDidMount() {
    this.animate()
  }

  componentDidUpdate() {
    if (this.state.next) {
      this.animate().then(() => {
        this.setState({ current: this.state.next, next: null })
      })
    }
  }

  navigate(name) {
    this.setState({ next: name })
  }

  animate() {
    return new Promise((resolve) => {
      const panes = document.querySelectorAll('.pane')
      ![].forEach.call(panes, (pane) => {
        pane.offsetWidth
        pane.classList.toggle('active')
      })

      panes[0].addEventListener('transitionend', resolve)
    })
  }

  render() {
    return (
      <main>
        {React.Children.map(this.props.children, (child) => {
          if ('Pane' !== child.type.name) return child

          const component = child.props.component
          if (this.state.current === component.name || this.state.next === component.name)
            return React.createElement(child.props.component)

          return null
        })}
      </main>
    )
  }
}
