<template>
  <div class='floating'>
    <span> {{inputWords}} </span>
    <span class='styleTrans'>{{ runtimeTranscription }}</span>
  </div>
</template>

<script>
export default {
  name: 'vue-speech',

  props: {
    lang: {
      type: String,
      default: 'en-US'
    },
    onTranscriptionEnd: Function
  },

  computed: {
    inputWords: function () {
      const {transcription} = this
      return transcription.join(' ')
    }
  },

  data: () => ({
    runtimeTranscription: '',
    transcription: [],
    innerRecog: null
  }),

  methods: {
    checkApi () {
      try {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const {SpeechRecognition} = window

        if (!SpeechRecognition) {
          throw new Error('Speech Recognition does not exist on this browser. Use Chrome or Firefox')
        }

        console.log('[INFO] going to create, recognition')
        const recognition = new SpeechRecognition()
        this.innerRecog = recognition

        recognition.lang = this.lang
        recognition.interimResults = true
        recognition.continuous = true

        recognition.addEventListener('start', event => {
          console.log('[INFO] start', event)
        })
        recognition.addEventListener('error', event => {
          console.log('[INFO] error', event)
        })
        recognition.addEventListener('result', event => {
          const text = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

          this.runtimeTranscription = text
        })

        recognition.addEventListener('end', () => {
          if (this.runtimeTranscription !== '') {
            this.transcription.push(this.runtimeTranscription)

            this.$emit('onTranscriptionEnd', {
              transcription: this.transcription,
              lastSentence: this.runtimeTranscription
            })
            this.onTranscriptionEnd({
              transcription: this.transcription,
              lastSentence: this.runtimeTranscription
            })
          }
          this.runtimeTranscription = ''
        })

        recognition.addEventListener('start', () => {
          if (this.runtimeTranscription !== '') {
            this.transcription.push(this.runtimeTranscription)

            this.$emit('onTranscriptionEnd', {
              transcription: this.transcription,
              lastSentence: this.runtimeTranscription
            })
          }

          this.runtimeTranscription = ''
        })

        recognition.start()
      }
      catch(e){
        alert('[ERROR] SpeechRecognition', e)
      }
    }
  },

  mounted () {
    this.checkApi()
  },
  beforeDestroy: function () {
    console.log('[INFO] going to destroy, recognition')
    const {innerRecog} = this
    innerRecog.abort()
    innerRecog.stop()
  }
}
</script>
<style scoped>
.floating {
  background: yellow;
  max-width: 300px;
  display: block;
  position: absolute;
  padding: 5px 5px;
}
.styleTrans {

}
</style>