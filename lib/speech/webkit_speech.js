export default class WebkitSpeech {
  constructor() {
    this.utterance = new SpeechSynthesisUtterance()
    this.utterance.lang = 'en-US'
  }

  speak(text, pitch) {
    this.utterance.text = text
    this.utterance.pitch = pitch
    window.speechSynthesis.speak(this.utterance)
  }
}
