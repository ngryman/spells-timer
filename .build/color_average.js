'use strict'
const Champions = require('lol-champions')
const got = require('got')
const fs = require('fs')
const dominant = require('dominant-color')

let colors = {}

const promises = Champions.map((champion) =>
  new Promise((resolve) => {
    const filename = `tmp-${champion.id}`

    got.stream(champion.icon).pipe(fs.createWriteStream(filename)).on('finish', () => {
      dominant(filename, (err, color) => {
        fs.unlink(filename, () => {
          colors[champion.id] = `#${color}`
          resolve()
        })
      })
    })
  })
)

Promise.all(promises).then(() => {
  fs.writeFile('lib/champion_colors.json', JSON.stringify(colors, null, 2))
})
