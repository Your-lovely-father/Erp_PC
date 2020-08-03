<!--
 * @Descripttion:
 * @version:
 * @Date: 2020-04-08 12:00:06
 -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import  { initDynamicRoutes } from './router/index'
export default {
  name: 'app',

  components: {
  },
  mounted() {
    initDynamicRoutes()
  }


}
</script>
<style scoped>
</style>
