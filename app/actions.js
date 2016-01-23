import Store from './store'
import Hub from './hub'
import Champions from 'lol-champions'
import Spells from 'lol-spells'
import Uuid from 'node-uuid'

export function loadSummoner(name) {
  return Promise.resolve({
    id: 1,
    name: 'ngrygod'
  })
  .then(summoner => Store.summoner = summoner)
  .then(summoner => {
    Hub.emit('summoner', summoner)
    return summoner
  })
}

export function loadEnnemies(summoner) {
  return Promise.resolve([
    { id: 2, name: 'Plouc', champion: 'ahri', spells: [ { id: 'flash', cooldown: 3 }, { id: 'dot', cooldown: 0 } ]},
    { id: 3, name: 'KevinSaRace', champion: 'reksai', spells: [ { id: 'flash', cooldown: 0 }, { id: 'dot', cooldown: 250 } ]},
    { id: 4, name: 'PhucTran', champion: 'renekton', spells: [ { id: 'flash', cooldown: 300 }, { id: 'dot', cooldown: 250 } ]},
    { id: 5, name: 'xxAtomexx', champion: 'garen', spells: [ { id: 'flash', cooldown: 300 }, { id: 'dot', cooldown: 250 } ]},
    { id: 6, name: 'Vocyfera12', champion: 'jax', spells: [ { id: 'flash', cooldown: 300 }, { id: 'dot', cooldown: 250 } ]}
  ])
  .then(ennemies => ennemies.map(ennemy => {
    ennemy.champion = Champions.find(champion => champion.id === ennemy.champion)
    ennemy.spells = ennemy.spells.map(spell => {
      const refSpell = Spells.find(refSpell => refSpell.id === spell.id)
      return Object.assign({}, refSpell, {
        key: Uuid.v1(),
        cooldown: spell.cooldown
      })
    })
    return ennemy
  }))
  .then(ennemies => Store.ennemies = ennemies)
  .then(ennemies => {
    Hub.emit('ennemies', ennemies)
    return ennemies
  })
}

export function decrementSpellsCooldown() {
  Store.ennemies
  .reduce((res, ennemy) => res.concat(ennemy.spells), [])
  .filter(spell => spell.cooldown > 0)
  .forEach(spell => spell.cooldown--)

  Hub.emit('spells_cooldown', Store.ennemies)
  return Store.ennemies
}

export function resetSpellCooldown(spell) {
  spell = Store.ennemies
  .reduce((res, ennemy) => res.concat(ennemy.spells), [])
  .find(ennemySpell => ennemySpell.key === spell.key)

  const refSpell = Spells.find(refSpell => refSpell.id === spell.id)
  spell.cooldown = refSpell.cooldown

  Hub.emit('spells_cooldown', Store.ennemies)
  return Store.ennemies
}
