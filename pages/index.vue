<template>
  <div class="container" >
    
		<!-- Header -->
			<header id="header" :style='{"background-color": "#225473"}'>
				<a class="logo" href="/">Industrious</a>
			</header>

		<!-- Banner -->
			<section id="banner">
				<div class="inner">
          <div class="content">
            <h1>Industrious</h1>
            <p>A responsive business oriented template with a video background<br />
            designed by <a href="https://templated.co/">TEMPLATED</a> and released under the Creative Commons License.</p>
            <a
              class="button"
              :href="`/translate/${defaultLangObj.value}`"
            > {{defaultLangObj.display}} </a>
				  </div>
				</div>
			</section>

			<section class="wrapper">
				<div class="inner">
          <nuxt-link
            class="button primary small itemButton"
            :to="`/translate/${item.value}`"
            v-for='(item) in langList'
            :key='item.value'>
            {{item && item.display || '--'}}
          </nuxt-link>
				</div>
			</section>

  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import langList from '~/components/SpeechToText/config.js'

export default {
  components: {
    Logo
  },
  computed: {
    defaultLangObj : function(){
      return langList.find(item => item.value === "yue-Hant-HK")
    }
  },
  data: function(){
    return {langList}
  }
}
</script>

<style scoped>
.itemButton {
  margin: 5px 10px;
}
#banner{
  /* background: linear-gradient(135deg, #225473 100%, #63A6A6 100%); */
}
</style>
