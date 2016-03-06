import { Actions } from 'flummox'

export default class SpellsActions extends Actions {
  decrementCooldowns(spells) {
    spells.forEach((spell) => {
      if (spell.counting) {
        spell.cooldown--
        if (spell.cooldown < 0) {
          spell.counting = false
          spell.cooldown = 0
        }
      }
    })
    return spells
  }

  resetCooldown(spell) {
    spell.cooldown = spell.refCooldown
    spell.counting = true
    return spell
  }

  forwardCooldown(spell) {
    spell.cooldown -= 10
    return spell
  }
}
