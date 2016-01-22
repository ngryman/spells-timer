import React, { Component } from 'react'
import Mixin from 'react-mixin'
import Pane from '../../mixins/pane.js'
import { loadSummoner, loadEnnemies } from '../../actions'

export default class Welcome extends Component {
  render() {
    return (
      <section className={this.sectionClasses()}>
        <h1>Welcome summoner</h1>
        <form onSubmit={::this.handleSubmit}>
          <input ref="summonerInput" placeholder="Enter a summoner's name" required />
          <button>Search</button>
        </form>
      </section>
    )
  }

  handleSubmit(e) {
    e.preventDefault()

    loadSummoner(this.refs.summonerInput.value)
    .then(loadEnnemies)
    .then(() => {
      this.context.navigate('InGame')
    })
  }
}

Mixin.onClass(Welcome, Pane)
