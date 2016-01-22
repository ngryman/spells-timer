import champions from 'lol-champions'
import { phonetics } from 'clj-fuzzy'

const COMMANDS = champions.map(champion => {
  return {
    name: champion.name,
    metaphone: phonetics.double_metaphone(champion.id)
  }
})

export default COMMANDS
