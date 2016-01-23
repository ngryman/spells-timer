import { Store } from 'flummox'

export default class GameStore extends Store {
  constructor(flux) {
    super()

    const userActionIds = flux.getActionIds('game')
    this.register(userActionIds.loadInfos, this.handleLoadInfos)

    const spellActionIds = flux.getActionIds('spell')
    this.register(spellActionIds.decrementCooldowns, this.handleDecrementSpellCooldowns)
    this.register(spellActionIds.resetCooldown, this.handleResetSpellCooldown)

    this.state = {
      ennemies: [],
      spells: []
    }
  }

  handleLoadInfos(game) {
    const spells = game.ennemies.reduce(
      (res, ennemy) => res.concat(ennemy.spells), []
    )

    const ennemies = game.ennemies
    ennemies.forEach((ennemy) => delete ennemy.spells)

    this.setState({ ennemies, spells })
  }

  handleDecrementSpellCooldowns(spells) {
    this.setState({ spells })
  }

  handleResetSpellCooldown(newSpell) {
    const spells = this.state.spells.map((spell) => {
      if (spell.key === newSpell.key)
        return newSpell
      return spell
    })

    this.setState({ spells })
  }

  getEnnemies() {
    const ennemies = this.state.ennemies.map((ennemy) =>
      Object.assign({
        spells: this.state.spells.filter((spell) => spell.ennemyKey === ennemy.key)
      }, ennemy)
    )
    return ennemies
  }
}
