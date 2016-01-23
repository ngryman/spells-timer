import { Actions } from 'flummox'
import Spells from 'lol-spells'

export default class SpellActions extends Actions {
  decrementCooldowns(spells) {
    spells.forEach((spell) => spell.cooldown--)
    return spells
  }

  resetCooldown(spell) {
    const spellDef = Spells.find((spellDef) => spellDef.id === spell.id)
    spell.cooldown = spellDef.cooldown
    return spell
  }
}
