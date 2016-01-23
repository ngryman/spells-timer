import { Flux } from 'flummox'
import UserActions from './actions/user'
import SpellActions from './actions/spell'
import GameActions from './actions/game'
import UserStore from './stores/user'
import GameStore from './stores/game'

export default class AppFlux extends Flux {
  constructor() {
    super()

    this.createActions('user', UserActions)
    this.createActions('spell', SpellActions)
    this.createActions('game', GameActions)

    this.createStore('user', UserStore, this)
    this.createStore('game', GameStore, this)
  }
}
