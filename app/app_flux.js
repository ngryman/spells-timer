import { Flux } from 'flummox'

import UserActions from './actions/user'
import GameActions from './actions/game'
import SpellsActions from './actions/spells'

import UserStore from './stores/user'
import EnnemiesStore from './stores/ennemies'
import SpellsStore from './stores/spells'

export default class AppFlux extends Flux {
  constructor() {
    super()

    this.createActions('user', UserActions)
    this.createActions('game', GameActions)
    this.createActions('spells', SpellsActions)

    this.createStore('user', UserStore, this)
    this.createStore('ennemies', EnnemiesStore, this)
    this.createStore('spells', SpellsStore, this)
  }
}
