<template>
  <div id="app">
    <my-header/>
    <tab/>
    <keep-alive>
      <router-view/>
    </keep-alive>
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
