import { phonetics, metrics } from 'clj-fuzzy'
import COMMANDS from './commands'

export default class WebkitVoiceRecognition {
  constructor() {
    this.recognition = new webkitSpeechRecognition()
    this.recognition.continuous = false
    this.recognition.interimResults = false
    this.recognition.lang = 'fr_FR'

    this.recognition.onstart = ::this.onStart
    this.recognition.onerror = ::this.onError
    this.recognition.onend = ::this.onEnd
    this.recognition.onresult = ::this.onResult

    this.transcript = ''
  }

  start() {
    this.recognition.start()
  }

  stop() {
    this.recognition.stop()
  }

  onStart(e) {
    console.log(e)
  }

  onError(e) {
    console.log(e)
  }

  onEnd(e) {
    const transcriptMetaphone = phonetics.double_metaphone(this.transcript)
    console.log(this.transcript)

    // const command = COMMANDS.map(command => metrics.levenshtein(command.metaphone, phonetics.metaphone(this.transcript)))
    const command = COMMANDS
    .map(command => {
      return {
        name: command.name,
        distance: metrics.jaro(command.name, this.transcript)
      }
      // return {
      //   score: metrics.jaro(command.metaphone, transcriptMetaphone),
      //   command
      // }
    })
    .reduce((c1, c2) => {
      console.log(c2)
      if (c1.distance < c2.distance)
        return c1
      return c2
    })
    // .sort((c1, c2) => {
    //   return c1.score - c2.score
    // })
    console.log(command)
  }

  onResult(e) {
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (event.results[i].isFinal)
        this.transcript += e.results[i][0].transcript;
    }
  }
}

const getEditDistance = function(a, b) {
  if(a.length == 0) return b.length;
  if(b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};
