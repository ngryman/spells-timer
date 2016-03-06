import { Store } from 'flummox'

export default class EnnemiesStore extends Store {
  constructor(flux) {
    super()

    const gameActionIds = flux.getActionIds('game')
    this.register(gameActionIds.loadInfos, this.handleLoadInfos)

    const spellActionIds = flux.getActionIds('spells')
    this.register(spellActionIds.decrementCooldowns, this.handleDecrementSpellCooldowns)
    this.register(spellActionIds.startCooldown, this.handleStartSpellCooldown)
    this.register(spellActionIds.forwardCooldown, this.handleForwardCooldown)
    this.register(spellActionIds.resetCooldown, this.handleResetCooldown)

    this.state = {
      ennemies: []
    }
  }

  getSpells() {
    return this.state.ennemies.reduce(
      (res, ennemy) => res.concat(ennemy.spells), []
    )
  }

  getEnnemyBySpell(spell) {
    return this.state.ennemies.find(
      (ennemy) => ennemy.spells[0].key === spell.key || ennemy.spells[1].key === spell.key
    )
  }

  getWarningSpells() {
   return this.getSpells()
     .filter(
       (spell) => (0 === spell.cooldown || 30 === spell.cooldown || 60 === spell.cooldown) && spell.counting
     )
     .sort(
       (spell1, spell2) => spell1.cooldown - spell2.cooldown
     )
 }

  /* -------------------------------------------------------------------------- */

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

  handleStartSpellCooldown(spell) {
    const ennemies = this.state.ennemies.map((ennemy) => {
      ennemy.spells = ennemy.spells.map(
        (ennemySpell) => (spell.key === ennemySpell.key ? spell : ennemySpell)
      )
      return ennemy
    })

    this.setState({ ennemies })
  }

  handleForwardCooldown(spell) {
    const ennemies = this.state.ennemies.map((ennemy) => {
      ennemy.spells = ennemy.spells.map(
        (ennemySpell) => (spell.key === ennemySpell.key ? spell : ennemySpell)
      )
      return ennemy
    })

    this.setState({ ennemies })
  }

  handleResetCooldown(spell) {
    const ennemies = this.state.ennemies.map((ennemy) => {
      ennemy.spells = ennemy.spells.map(
        (ennemySpell) => (spell.key === ennemySpell.key ? spell : ennemySpell)
      )
      return ennemy
    })

    this.setState({ ennemies })
  }
}
