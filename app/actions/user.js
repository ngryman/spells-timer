import { Actions } from 'flummox'

export default class UserActions extends Actions {
  loadSummoner(name) {
    return Promise.resolve({
      id: 1,
      name: 'ngrygod'
    })
  }
}
