import React, { Component } from 'react'
import VoiceRecognition from '../../lib/voice_recognition'

export default class VoiceController extends Component {
  componentDidMount() {
    this.recognition = new VoiceRecognition()
    // this.start()
  }

  start() {
    this.recognition.start()
  }

  stop() {
    this.recognition.stop()
  }

  render() { return null }
}
