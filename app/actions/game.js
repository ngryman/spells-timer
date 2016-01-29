import { Actions } from 'flummox'
import Champions from 'lol-champions'
import Spells from 'lol-spells'
import Uuid from 'node-uuid'

export default class GameActions extends Actions {
  loadInfos(summoner) {
    return Promise.resolve({
      participants: [
        { summonerId: 2, summonerName: 'Plouc', championId: 'ahri', spell1Id: 'flash', spell2Id: 'dot'},
        { summonerId: 2, summonerName: 'KevinSaRace', championId: 'reksai', spell1Id: 'flash', spell2Id: 'teleport'},
        { summonerId: 2, summonerName: 'PhucTran', championId: 'jax', spell1Id: 'flash', spell2Id: 'dot'},
        { summonerId: 2, summonerName: 'xxAtomexx', championId: 'tryndamere', spell1Id: 'flash', spell2Id: 'teleport'},
        { summonerId: 2, summonerName: 'Vocyfera12', championId: 'missfortune', spell1Id: 'flash', spell2Id: 'exhaust'}
      ]
    })
    .then((gameInfos) => ({
      ennemies: gameInfos.participants.map((participant) => createEnnemy(participant))
    }))
    .then((gameInfos) => {
      gameInfos.ennemies[0].spells[0].cooldown = 2
      gameInfos.ennemies[0].spells[0].counting = true
      return gameInfos
    })
  }

  // const API_KEY = '81d00796-d2a2-4e8e-b112-2c20c7ef60c0'
  // const API_URL = 'https://euw.api.pvp.net'

  // return fetch(`https://crossorigin.me/${API_URL}/observer-mode/rest/consumer/getSpectatorGameInfo/EUW1/${summoner.id}?api_key=${API_KEY}`)
  // .then(res => {
  //   if (404 === res.status) return Promise.reject('No live game found.')
  //   res.json().then(game => {
  //     const participants = game.participants.map(participant => {
  //       return {
  //         summonerName: participant.summonerName,
  //         championId: participant.championId,
  //         spell1Id: participant.spell1Id,
  //         spell2Id: participant.spell2Id
  //       }
  //     })
  //     store.set('participants', participants)
  //     return participants
  //   })
  // })
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
