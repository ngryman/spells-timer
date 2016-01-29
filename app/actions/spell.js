import { Actions } from 'flummox'

export default class SpellActions extends Actions {
  decrementCooldowns(spells) {
    spells.forEach((spell) => {
      if (spell.counting) {
        spell.cooldown--
        if (0 === spell.cooldown)
          spell.counting = false
      }
    })
    return spells
  }

  resetCooldown(spell) {
    if (spell.cooldown > 0) return

    spell.cooldown = spell.refCooldown
    spell.counting = true
    return spell
  }
}
