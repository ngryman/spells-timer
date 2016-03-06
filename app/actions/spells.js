import { Actions } from 'flummox'

export default class SpellsActions extends Actions {
  decrementCooldowns(spells) {
    spells.forEach(cooldownTick.bind(null, 1))
    return spells
  }

  resetCooldown(spell) {
    spell.cooldown = spell.refCooldown
    spell.counting = true
    return spell
  }

  forwardCooldown(spell) {
    return cooldownTick(10, spell)
  }
}

/* -------------------------------------------------------------------------- */

function cooldownTick(incr, spell) {
  if (spell.counting) {
    spell.cooldown -= incr
    if (spell.cooldown < 0) {
      spell.counting = false
      spell.cooldown = 0
    }
  }

  return spell
}
