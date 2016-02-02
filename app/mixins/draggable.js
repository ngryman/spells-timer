import React from 'react'
import ReactDOM from 'react-dom'

const Draggable = {
  propTypes: {
    draggable: React.PropTypes.bool
  },

  componentDidMount() {
    if (this.props.draggable) {
      const draggable = {
        el: ReactDOM.findDOMNode(this),
        dragging: false,
        draggingEl: null,
        y: 0,
        handlers: {
          down: ::this.handleDragStart,
          move: ::this.handleDragging,
          up: ::this.handleDragEnd
        }
      }

      draggable.el.addEventListener('mousedown', draggable.handlers.down)

      this.setState({ draggable })
    }
  },

  handleDragStart(e) {
    const d = this.state.draggable

    d.draggingEl = e.path.find(
      (p) => p.classList.contains('ennemy')
    )

    d.startY = e.clientY

    d.el.addEventListener('mousemove', d.handlers.move)
    d.el.addEventListener('mouseup', d.handlers.up)
  },

  handleDragging(e) {
    const d = this.state.draggable

    if (!d.dragging && Math.abs(e.clientY - d.startY) > 10) {
      d.draggingEl.classList.add('dragging')
      d.dragging = true
    }
  },

  handleDragEnd(e) {
    const d = this.state.draggable

    if (d.dragging) {
      let destEl = document.elementFromPoint(e.clientX, e.clientY)
      while (!destEl.classList.contains('ennemy'))
        destEl = destEl.parentNode

      const dragNextEl = d.draggingEl.nextElementSibling

      d.el.insertBefore(d.draggingEl, destEl.nextElementSibling)
      d.el.insertBefore(destEl, dragNextEl)

      d.draggingEl.classList.remove('dragging')
      d.dragging = false
    }

    d.el.removeEventListener('mousemove', d.handlers.move)
    d.el.removeEventListener('mouseup', d.handlers.up)
  }
}

export default Draggable
