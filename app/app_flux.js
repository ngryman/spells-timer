import { Flux } from 'flummox'
import UserActions from './actions/user'
import GameActions from './actions/game'
import UserStore from './stores/user'
import GameStore from './stores/game'

export default class AppFlux extends Flux {
  constructor() {
    super()

    this.createActions('user', UserActions)
    this.createActions('game', GameActions)

    this.createStore('user', UserStore, this)
    this.createStore('game', GameStore, this)
  }
}
