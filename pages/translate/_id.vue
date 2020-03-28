<template>
  <div class="container">
    <!-- Header -->
			<header id="header" :style='{"background-color": "#225473"}'>
      <a class="logo" href="/">Speech To Text Online</a>
    </header>

    <section class="wrapper" id="main">
      <div class="inner">
        <div class="content" v-if="langObj">
          {{langObj && langObj.display || '--'}}
          <div class="buttonBorder" @click="()=> isSpeechOn=!isSpeechOn">
            <span :class="recordButton"></span>
          </div>
          <SpeechToText
            :lang="langObj.value"
            v-if="isSpeechOn"
            :onTranscriptionEnd="onTranscriptionEnd"
          />

          <textarea
            type="text"
            name="igUrl"
            placeholder="https://www.instagram.com/p/B78mO-3jgYD/"
            v-model="value"
          />
          <div class="row gtr-uniform separatorRowMargin">
            <div class="col-4 col-4-xsmall">
              <label class='separatorLabel'> Separator:</label>
            </div>
            <div class="col-4 col-4-xsmall">
              <input type="text" name="separator" v-model="separator"  placeholder=",">
            </div>
          </div>
        </div>
        <div v-else>langObj is null</div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import SpeechToText from "@/components/SpeechToText";
import langList from "~/components/SpeechToText/config.js";
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Logo,
    SpeechToText,
    Footer
  },
  computed: {
    recordButton: function() {
      const _class = this.isSpeechOn ? " Rec" : "";
      return "styleSpeechButton" + _class;
    },
    langObj: function() {
      if (!this.id) return null;
      return langList.find(item => item.value === this.id);
    }
  },
  data() {
    const { id = null } = this.$route.params;
    if (!id) throw new Error("[ERROR] id is required");
    return {
      value: "",
      isSpeechOn: false,
      id,
      separator: ','
    };
  },
  methods: {
    onTranscriptionEnd: function(textObj = {}) {
      const {separator} = this
      const { transcription } = textObj;

      if(!this.value) return this.value = transcription.join(" ");

      return this.value += `${separator}` + transcription.join(" ");
    }
  }
};
</script>

<style scoped>
.separatorRowMargin{
  margin-top: 5px;
}
.separatorLabel{
  line-height: 50px;
  font-size: 15px;
}
.content {
  max-width: 600px;
  margin: auto;
}

textarea {
  min-height: 200px;
  color: #225473;
}
.buttonBorder {
  width: 100%;
  border-radius: 3px;
  background-color: #225473;
  text-align: center;
  margin-bottom: 30px;
  cursor: pointer;
}
.styleSpeechButton {
  width: 15px;
  height: 15px;
  font-size: 0;
  background-color: red;
  border: 0;
  border-radius: 35px;
  outline: none;
  display: inline-block;
  cursor: pointer;
  margin-left: 10px;
  vertical-align: middle;
  margin: 10px 0;
}
.inputTitle {
  /* font-size: 12px;
  line-height: 30px;
  height: 30px;
  display: inline-block; */
}

.Rec {
  animation-name: pulse;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes pulse {
  0% {
    box-shadow: 0px 0px 5px 0px rgba(173, 0, 0, 0.3);
  }
  65% {
    box-shadow: 0px 0px 5px 13px rgba(173, 0, 0, 0.3);
  }
  90% {
    box-shadow: 0px 0px 5px 13px rgba(173, 0, 0, 0);
  }
}
</style>
