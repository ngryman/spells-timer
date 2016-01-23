import { Store } from 'flummox'

export default class UserStore extends Store {
  constructor(flux) {
    super()

    const userActionIds = flux.getActionIds('user')
    this.register(userActionIds.loadSummoner, this.handleLoadSummoner)

    this.state = {
      summoner: null
    }
  }

  handleLoadSummoner(summoner) {
    this.setState({ summoner })
  }
}
