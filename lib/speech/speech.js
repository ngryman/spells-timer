import WebkitSpeech from './webkit_speech'
import NativeSpeech from './native_speech'

export default class VoiceRecognition {
  constructor() {
    if ('speechSynthesis' in window)
      this.tts = new WebkitSpeech()
    else
      this.tts = new NativeSpeech()
  }

  speak(text, pitch = 0) {
    this.tts.speak(text, pitch)
  }
}
