import WebkitVoiceRecognition from './webkit_voice_recognition'
import NativeVoiceRecognition from './native_voice_recognition'

export default class VoiceRecognition {
  constructor() {
    if ('webkitSpeechRecognition' in window)
      this.recognition = new WebkitVoiceRecognition()
    else
      this.recognition = new NativeVoiceRecognition()
  }

  start() {
    this.recognition.start()
  }

  stop() {
    this.recognition.stop()
  }
}
