import { Store } from 'flummox'

export default class EnnemiesStore extends Store {
  constructor(flux) {
    super()

    const userActionIds = flux.getActionIds('game')
    this.register(userActionIds.loadInfos, this.handleLoadInfos)

    const spellActionIds = flux.getActionIds('spells')
    this.register(spellActionIds.decrementCooldowns, this.handleDecrementSpellCooldowns)
    this.register(spellActionIds.resetCooldown, this.handleResetSpellCooldown)

    this.state = {
      ennemies: []
    }
  }

  getEnnemyBySpell(spell) {
    return this.state.ennemies.find(
      (ennemy) => ennemy.spells[0].key === spell.key || ennemy.spells[1].key === spell.key)
  }

  handleLoadInfos(game) {
    this.setState({ ennemies: game.ennemies })
  }

  handleDecrementSpellCooldowns(spells) {
    const ennemies = this.state.ennemies.map((ennemy) => {
      ennemy.spells = ennemy.spells.map((ennemySpell) =>
        spells.find((spell) => spell.key === ennemySpell.key)
      )
      return ennemy
    })

    this.setState({ ennemies })
  }

  handleResetSpellCooldown(spell) {
    const ennemies = this.state.ennemies.map((ennemy) => {
      ennemy.spells = ennemy.spells.map((ennemySpell) => {
        if (spell.key === ennemySpell.key)
          return spell
        return ennemySpell
      })
      return ennemy
    })

    this.setState({ ennemies })
  }
}
