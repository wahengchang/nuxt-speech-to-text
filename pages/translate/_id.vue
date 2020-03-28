<template>
  <div class="container">
    <!-- Header -->
			<header id="header" :style='{"background-color": "#225473"}'>
      <a class="logo" href="/">Speech To Text Online</a>
    </header>

    <!-- <div class='row functionBar'> -->
    <section class="" id="main">
        <div class="inner">
          <div class="content" v-if="langObj">
            <div class="row">
              <div class="col-12 col-12-xsmall">
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
              </div>
            </div>

            <div class='row functionBar separatorRowMargin'>
              <div class="col-8 col-8-xsmall">
                <select name="translateLanguage" class='dropdownTranslate' v-model="translateLanguage">
                  <option
                    v-for='item in translateList'
                    :value="item.value"
                    :key='item.value'
                  >
                      {{item.display}}
                  </option>
                </select>
              </div>
              <div class="col-4 col-4-xsmall">
                <a href="#" class="icon fa-language translateButton" @click='onHandleTranslate'></a>
              </div>
            </div>
            <div class="row gtr-uniform separatorRowMargin">
              <div class="col-3 col-3-xsmall">
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
import config from "~/components/SpeechToText/config.js";
import Footer from '~/components/Footer.vue'
import axios from 'axios'

const {speech: langList, translate: translateList} = config
const DEFAULT_TRANSLATE_LANG = 'en'

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
      separator: ',',
      translateList,
      translateLanguage: DEFAULT_TRANSLATE_LANG
    };
  },
  methods: {
    onHandleTranslate: async function() {
      try {
        const {value, translateLanguage} = this
        const { data } = await axios.get(`/apis/translate?text=${value}&to=${translateLanguage}`)
        this.value =  data.text
      }
      catch(e){
        alert(e)
      }

    },
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
.functionBar {
}
.dropdownTranslate {
  line-height: 30px;
  height: 30px;
}
.translateButton {
  padding: 0 10px;
  font-size: 20px;
}
.separatorRowMargin{
  margin-top: 5px;
}
.separatorLabel{
}
input[name="separator"]{
  line-height: 30px;
  height: 30px;
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
