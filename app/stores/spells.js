import { Store } from 'flummox'

export default class SpellsStore extends Store {
  constructor(flux) {
    super()

    const userActionIds = flux.getActionIds('game')
    this.register(userActionIds.loadInfos, this.handleLoadInfos)

    const spellActionIds = flux.getActionIds('spells')
    this.register(spellActionIds.decrementCooldowns, this.handleDecrementSpellCooldowns)
    this.register(spellActionIds.resetCooldown, this.handleResetSpellCooldown)

    this.state = {
      spells: []
    }
  }

  getWarningSpells() {
    return this.state.spells
      .filter(
        (spell) => (0 === spell.cooldown || 30 === spell.cooldown || 60 === spell.cooldown) && spell.counting
      )
      .sort(
        (spell1, spell2) => spell1.cooldown - spell2.cooldown
      )
  }

  handleLoadInfos(game) {
    const spells = game.ennemies.reduce(
      (res, ennemy) => res.concat(ennemy.spells), []
    )

    this.setState({ spells })
  }

  handleDecrementSpellCooldowns(spells) {
    this.setState({ spells })
  }

  handleResetSpellCooldown(newSpell) {
    const spells = this.state.spells.map((spell) => {
      if (spell.key === newSpell)
        return newSpell
      return spell
    })

    this.setState({ spells })
  }
}
