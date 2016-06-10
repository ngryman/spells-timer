import { Actions } from 'flummox'
import Champions from 'lol-champions'
import Spells from 'lol-spells'
import Uuid from 'node-uuid'

/* -------------------------------------------------------------------------- */

const participants = [
  { summonerId: 2, summonerName: 'Plouc', championId: 'jax', spell1Id: 'flash', spell2Id: 'teleport'},
  { summonerId: 2, summonerName: 'KevinSaRace', championId: 'nidalee', spell1Id: 'flash', spell2Id: 'smite'},
  { summonerId: 2, summonerName: 'PhucTran', championId: 'ahri', spell1Id: 'barrier', spell2Id: 'dot'},
  { summonerId: 2, summonerName: 'xxAtomexx', championId: 'missfortune', spell1Id: 'flash', spell2Id: 'heal'},
  { summonerId: 2, summonerName: 'Vocyfera12', championId: 'tahmkench', spell1Id: 'haste', spell2Id: 'exhaust'}
]

/* -------------------------------------------------------------------------- */

export default class GameActions extends Actions {
  loadInfos(summoner) {
    return Promise.resolve({ participants })
    .then((gameInfos) => ({
      ennemies: gameInfos.participants.map(
        (participant) => createEnnemy(participant)
      )
    }))
    .then((gameInfos) => {
      gameInfos.ennemies[0].spells[0].cooldown = 10
      gameInfos.ennemies[0].spells[0].counting = true
      return gameInfos
    })
  }
}

const createEnnemy = (participant) => {
  const key = Uuid.v1()
  return {
    key,
    id: participant.summonerId,
    name: participant.summonerName,
    champion: createChampion(participant.championId),
    spells: [
      createSpell(participant.spell1Id, key),
      createSpell(participant.spell2Id, key)
    ]
  }
}

const createChampion = (championId) => {
  return Champions.find((champion) => champion.id === championId)
}

const createSpell = (spellId, ennemyKey) => {
  const spellDef = Spells.find(spellDef => spellDef.id === spellId)
  return Object.assign({
    key: Uuid.v1(),
    ennemyKey
  }, spellDef, {
    cooldown: 0,
    refCooldown: spellDef.cooldown,
    counting: false
  })
}
