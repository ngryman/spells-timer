export default class WebkitSpeechSynthesis {
  constructor() {
    this.utterance = new SpeechSynthesisUtterance()
    this.utterance.lang = 'en-US'
  }

  speak(message) {
    this.utterance.text = message
    window.speechSynthesis.speak(this.utterance)
  }
}
