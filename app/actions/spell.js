import { Actions } from 'flummox'

export default class SpellActions extends Actions {
  decrementCooldowns(spells) {
    spells.forEach((spell) => spell.cooldown--)
    return spells
  }

  resetCooldown(spell) {
    if (spell.cooldown > 0) return

    spell.cooldown = spell.refCooldown
    return spell
  }
}
