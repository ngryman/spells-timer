export default class NativeSpeech {
  speak(text, pitch) {
    TTS.speak({
      text,
      rate: pitch
    })
  }
}
