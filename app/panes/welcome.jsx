import React, { Component } from 'react'
import Mixin from 'react-mixin'
import Pane from '../mixins/pane'
import State from '../mixins/state'

export default class Welcome extends Component {
  render() {
    return (
      <section className={this.sectionClasses('welcome')}>
        <h1>Welcome summoner</h1>
        <form onSubmit={::this.handleSubmit}>
          <fieldset>
            <legend>Summoner's name</legend>
            <input ref="summonerInput" required defaultValue="ngrygod" />
          </fieldset>
          <button><i className="material-icons">chevron_right</i></button>
        </form>
      </section>
    )
  }

  handleSubmit(e) {
    e.preventDefault()

    const summonerName = this.refs.summonerInput.value
    const user = this.context.flux.getActions('user')
    const game = this.context.flux.getActions('game')

    user.loadSummoner()
      .then(game.loadInfos)
      .then(() => {
        this.context.navigate('InGame')
      })
  }
}

Mixin.onClass(Welcome, Pane)
Mixin.onClass(Welcome, State)
