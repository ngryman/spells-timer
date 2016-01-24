import React from 'react'
import classnames from 'classnames'

const Pane = {
  contextTypes: {
    active: React.PropTypes.bool,
    navigate: React.PropTypes.func.isRequired
  },

  sectionClasses(paneName) {
    return classnames({ pane: true, [paneName]: true, active: this.context.active })
  }
}

export default Pane
