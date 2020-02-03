<template>
  <div class="container">
  

  </div>
 
  

</template>

<script>
import {firebase} from '~/plugins/firebase'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

export default {

  methods: {

  }
}
</script>

<style scoped>
.container {
 height: 100%;
}

/* 以下を追加 */
.chats-layout {
 overflow: scroll;
 height: 90%;
}

.input-layout {
 height: 10%;
}

</style>