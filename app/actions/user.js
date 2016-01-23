import { Actions } from 'flummox'

export default class UserActions extends Actions {
  loadSummoner(name) {
    return Promise.resolve({
      id: 1,
      name: 'ngrygod'
    })
  }
}

// import store from '../store'
//
// const API_KEY = '81d00796-d2a2-4e8e-b112-2c20c7ef60c0'
// const API_URL = 'https://euw.api.pvp.net'
//
// export function loadSummoner(name) {
//   return fetch(`${API_URL}/api/lol/euw/v1.4/summoner/by-name/${name}?api_key=${API_KEY}`)
//   .then(res =>
//     res.json().then(summoners => {
//       var summoner = summoners[name.toLowerCase()]
//       if (!summoner) return Promise.reject('No summoner found.')
//       store.set('summoner', summoner)
//       return summoner
//     })
//   )
// }
