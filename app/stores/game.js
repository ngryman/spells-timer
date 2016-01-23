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
      spells: [],
      warningSpells: []
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
    const warningSpells = spells
    .filter((spell) => 0 === spell.cooldown || 30 === spell.cooldown || 60 === spell.cooldown)
    .sort((spell1, spell2) => spell1.cooldown - spell2.cooldown)

    this.setState({ spells, warningSpells })
  }

  handleResetSpellCooldown(newSpell) {
    const spells = this.state.spells.map((spell) => {
      if (spell.key === newSpell.key)
        return newSpell
      return spell
    })

    this.setState({ spells })
  }

  getEnnemyBySpell(spell) {
    return this.state.ennemies.find(
      (ennemy) => ennemy.key === spell.ennemyKey
    )
  }
}
