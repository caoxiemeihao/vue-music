<template>
  <div id="app">
    <my-header/>
    <tab/>
    <router-view/>
  </div>
</template>

<script>
import MyHeader from '@comps/header/header'
import Tab from '@comps/tab/tab'

export default {
  name: 'app',
  components: {
    MyHeader,
    Tab,
  }
}
</script>

<style lang="stylus" scoped>
@import "common/stylus/variable";

#app
  // color: $color-theme
</style>
