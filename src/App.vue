<template>
  <div id="app">
    <my-header />
  </div>
</template>

<script>
import MyHeader from '@comps/header/header'

export default {
  name: 'app',
  components: {
    MyHeader
  }
}
</script>

<style lang="stylus" scoped>
@import "common/stylus/variable";

#app
  color: $color-theme
</style>
