import React from 'react'
import classnames from 'classnames'

const Pane = {
  contextTypes: {
    active: React.PropTypes.bool,
    navigate: React.PropTypes.func.isRequired
  },

  sectionClasses() {
    return classnames({ pane: true, active: this.context.active })
  }
}

export default Pane
