import WebkitSpeechSynthesis from './webkit_speech_synthesis'
import NativeSpeechSynthesis from './native_speech_synthesis'

export default class VoiceRecognition {
  constructor() {
    if ('speechSynthesis' in window)
      this.tts = new WebkitSpeechSynthesis()
    else
      this.tts = new NativeSpeechSynthesis()
  }

  speak(text, pitch = 0) {
    this.tts.speak(text, pitch)
  }
}
