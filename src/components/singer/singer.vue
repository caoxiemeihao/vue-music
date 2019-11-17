<template>
  <div class="singer">
    
  </div>
</template>

<script>
import { getSingerList } from '@api/singer'
import { ERR_OK } from '@api/config'

export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    async _getSingerList() {
      const [err, res] = await getSingerList()
      if (!err && res.code === ERR_OK) {
        this.singers = res.data.list
        console.log(this.singers)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.singer
  position fixed
  top 88px
  bottom 0
  width 100%
</style>
